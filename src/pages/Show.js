import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';
import ShowMainData from '../components/shows/ShowMainData';
import Details from '../components/shows/Details';
import Seasons from '../components/shows/Seasons';
import Cast from '../components/shows/Cast';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'Fetch_Success': {
      return { isLoading: false, error: null, shown: action.shown };
    }
    case 'Fetch_Failed': {
      return { ...prevState, isLoading: false, error: action.error };
    }
    default:
      return prevState;
  }
};

const initialState = {
  shown: null,
  isLoading: true,
  error: null,
};

const Show = () => {
  const { id } = useParams();

  const [{ shown, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // UseReducer is more efficient than UseState so we have used that concept !!
  // const [shown, setShown] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  let isUnmount = true;

  useEffect(() => {
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        setTimeout(() => {
          if (isUnmount) {
            dispatch({ type: 'Fetch_Success', shown: results });
          }
        }, 2000);
      })
      .catch(err => {
        if (isUnmount) {
          dispatch({ type: 'Fetch_Failed', error: err.message });
        }
      });
    return () => {
      isUnmount = false;
    };
  }, [id]);

  console.log(shown);

  if (isLoading) {
    console.log(isLoading);
    return <div>Data is being Loading</div>;
  }

  if (error) {
    return <div>There is some sort of Error:{error}</div>;
  }

  return (
    <div>
      <ShowMainData
        image={shown.image}
        name={shown.name}
        rating={shown.rating}
        summary={shown.summary}
        tags={shown.genres}
      />
      <div>
        <h2>Details</h2>
        <Details
          status={shown.status}
          network={shown.network}
          premiered={shown.premiered}
        />
      </div>
      <div>
        <h2>Seasons</h2>
        <Seasons seasons={shown._embedded.seasons} />
      </div>
      <div>
        <h2>Cast</h2>
        <Cast cast={shown._embedded.cast} />
      </div>
    </div>
  );
};

export default Show;
