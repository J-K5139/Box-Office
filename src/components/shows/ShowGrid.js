import React from 'react';
import IMAGE_NOT_FOUND from '../../images/not-found.png';
import ShowCard from './ShowCard';
import { FlexGrid } from '../styled';
import { useShows } from '../../misc/Custom-hooks';

const ShowGrid = ({ data }) => {
  const [starredShows, dispatchStarred] = useShows();
  console.log(starredShows);
  return (
    <FlexGrid>
      {data.map(({ show }) => {
        console.log("show-ids",show.id);
        const isStarred = starredShows.includes(show.id);

        const onStarClick = () => {
          if (isStarred) {
            dispatchStarred({ type: 'REMOVE', showId: show.id });
          } else {
            dispatchStarred({ type: 'ADD', showId: show.id });
          }
        };

        return (
          <ShowCard
            key={show.id}
            id={show.id}
            name={show.name}
            image={show.image ? show.image.medium : IMAGE_NOT_FOUND}
            summary={show.summary}
            onStarClick={onStarClick}
            isStarred={isStarred}

          />
        );
      })}
    </FlexGrid>
  );
};

export default ShowGrid;
