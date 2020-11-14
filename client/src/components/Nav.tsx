import React from 'react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

interface Props {
  addQuery: (query: string) => void;
}

export const Nav: React.FC<Props> = (props) => {

  let history = useHistory();
  let location = useLocation();

  const [query, setQuery] = useState('');


  const handleSubmit = (e: any): void => {
    e.preventDefault();
    console.log('Submission: ', query);
    if (query !== "") {
      console.log('Submited: ', query);
      props.addQuery(query);
      history.push('/job-search');
      setQuery('');
    }
  }

  const handleChangeQuery = (e: any): void => {
    console.log('Handle Change activated')
    setQuery(e.target.value);
    console.log(query);
  }

  const handleSavedPosts = (e: any): void => {
    history.push('/saved-jobs')
  }

  const handleBackToSearch = (e: any): void => {
    history.push('/job-search')
  }

  const displayBtn = (): JSX.Element => {
  if(location.pathname === '/saved-jobs') return (<button onClick={handleBackToSearch}>Back to Search</button>)
  else if(location.pathname === '/job-details') return (<><button onClick={handleBackToSearch}>Back to Search</button> <button onClick={handleSavedPosts}>SavedPosts</button></>)
  else return (<button onClick={handleSavedPosts}>SavedPosts</button>)
  }


  return (
    <div className="">
      <div>Now showing post {location.pathname}</div>
      <form onSubmit={handleSubmit}>
        <input
          id="nav-search"
          name="nav-search"
          value={query}
          type="text"
          onChange={handleChangeQuery}
          placeholder="Search for a job in the uk..."
        ></input>
        <button onClick={handleSubmit}>Search</button>
      </form>
      {displayBtn()}
    </div>
  )
}
