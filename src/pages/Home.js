import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';
import ShowGrid from '../components/shows/ShowGrid';
import ActorGrid from '../components/actors/ActorGrid';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [show, setShow] = useState('shows');

  const isShowSearch = show === 'shows';
  console.log(isShowSearch);

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onSearchButton = () => {
    apiGet(`/search/${show}?q=${input}`).then(result => {
      // console.log(results);
      setResults(result);
    });
  };

  const isShowSet = ev => {
    setShow(ev.target.value);
    console.log(ev.target.value);
  };

  /*
  const enterButton = (ev)=>{
    if (ev.keyCode === 13){
      onSearchButton();
    }
  }
  */

  const RenderResults = () => {
    if (results && results.length === 0) {
      return <div> No results Found! </div>;
    }

    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }
    return null;
  };
  /* What is the difference between both of them ?

  results.map(item=>
    <div key={isShowSearch ? item.show.id : item.person.id}>{isShowSearch ? item.show.name : item.person.name}</div>)} </div>
  */

  return (
    <div>
      <MainPageLayout>
        <h1>This is a home page</h1>

        <input
          type="text"
          placeholder="Search for Something"
          onChange={onInputChange}
          value={input}
        />
        <div>
          <label htmlFor="forshows">
            Shows
            <input
              type="radio"
              id="forshows"
              value="shows"
              checked={isShowSearch}
              onChange={isShowSet}
            />
          </label>
          <label htmlFor="foractors">
            People
            <input
              type="radio"
              id="foractors"
              value="people"
              checked={!isShowSearch}
              onChange={isShowSet}
            />
          </label>
        </div>
        <button type="button" onClick={onSearchButton}>
          Search
        </button>
        {RenderResults()}
      </MainPageLayout>
    </div>
  );
};

export default Home;
