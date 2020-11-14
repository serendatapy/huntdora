import React from 'react';
import { useState } from 'react';

interface Props {
  addQuery: (query: string) => void;
}

export const Nav: React.FC<Props> = (props) => {

  const [query, setQuery] = useState('');


  const handleSubmit = (e: any): void => {
    e.preventDefault();
    if (query !== "") {
      console.log('Submited: ', query);
      props.addQuery(query);
    }
    setQuery('');
  }

  const handleChangeQuery = (e: any): void => {
    setQuery(e.target.value);
    console.log(query);
  }



  return (
    <div className="">
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
    </div>
  )
}
