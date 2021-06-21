import React,{useState} from 'react';
import MainPageLayout from '../components/MainPageLayout';
import {apiGet} from '../misc/config';


const Home = () => {

  const [input,setInput]=useState('');
  const [results,setResults]=useState(null);

  const onInputChange = (ev) => {
    setInput(ev.target.value);
  }

  const onSearchButton = ()=>{
    apiGet(`/search/shows?q=${input}`).then(result=>{
      // console.log(results);
      setResults(result);
      console.log(result);
    })
  }

  /*
  const enterButton = (ev)=>{
    if (ev.keyCode === 13){
      onSearchButton();
    }
  }
  */

  const RenderResults=()=>{
    if (results && results.length===0)
    {
     return <div> No results Found! </div>
    }

    if(results && results.length>0)
    {
      return <div> {results.map(item=> <div key={item.show.id}>{item.show.name}</div>)} </div>
    }

    return null;

  }

  return (
    <div>
      <MainPageLayout>
        <h1>This is a home page</h1>

        <input type='text' onChange={onInputChange} value={input}/>
    <button type="button" onClick={onSearchButton} >Search</button>
        {RenderResults()}
      </MainPageLayout>
    </div>
  );
};

export default Home;
