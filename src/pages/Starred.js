import React,{useState,useEffect} from 'react';
import { useShows } from '../misc/Custom-hooks';
import { apiGet } from '../misc/config';
import ShowGrid from '../components/shows/ShowGrid';
import MainPageLayout from '../components/MainPageLayout';

const Starred = () => {
  const [starred] = useShows();
  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(starred);
  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(showId => apiGet(`/shows/${showId}`));

      Promise.all(promises)
        .then(apiData => apiData.map(show => ({ show })))
        .then(results => {
          setShows(results);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);

  return (
    <MainPageLayout>
      {isLoading && <div>Shows are still loading</div>}
      {error && <div>Error Occured: {error}</div>}
      {!isLoading && !shows && <div>No shows were Added</div>}
      {!isLoading && !error && (
        <div>
          <ShowGrid data={shows} />
        </div>
      )}
    </MainPageLayout>
    // <div>h</div>
  );
};

export default Starred;
