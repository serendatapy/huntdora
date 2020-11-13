import React from 'react';
import { useState } from 'react';
import { debounce } from 'underscore';

interface Props {
  addQuery: (query: string) => void;
}

export const Nav: React.FC<Props> = (props) => {

  const [query, setquery] = useState('');


  const handleSubmit = (e: any): void => {
    e.preventDefault();
    if (query !== "") {
      console.log('Submited: ', query);
      props.addQuery(query);
    }
  }
  // const debounceSubmit = debounce(handleSubmit, 5000);

  const handleChangeQuery = (e: any): void => {
    setquery(e.target.value);
    console.log(query);
    // debounceSubmit(e)
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
          placeholder="Enter your UK job search here"
        ></input>
      </form>
    </div>
  )
}
