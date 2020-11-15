import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

type FormData = {
  query: string;
  locationName: string;
  distanceFrom: number | '';
  minimumSalary: number | '';
}

interface Props {
  addQuery: (data:
    {
      query: string;
      locationName: string;
      distanceFrom: number | "";
      minimumSalary: number | "";
    }) => void;
}

export const Nav: React.FC<Props> = (props) => {

  let history = useHistory();
  let location = useLocation();

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: any) => {
    console.log('Submited: ', data);
    props.addQuery(data);
    history.push('/job-search');
  }

  const handleSavedPosts = (): void => {
    history.push('/saved-jobs')
  }

  const handleBackToSearch = (): void => {
    history.push('/job-search')
  }

  const displayBtn = (): JSX.Element => {
    if (location.pathname === '/saved-jobs') return (<button onClick={handleBackToSearch}>Back to Search</button>)
    else if (location.pathname === '/job-details') return (<><button onClick={handleBackToSearch}>Back to Search</button> <button onClick={handleSavedPosts}>SavedPosts</button></>)
    else return (<button onClick={handleSavedPosts}>SavedPosts</button>)
  }


  return (
    <div className="">
      <div>Now showing post {location.pathname}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="query"
          ref={register}
          placeholder="Search for a job in the uk..."
          defaultValue=''
        ></input>
        <input
          name="locationName"
          ref={register}
          placeholder="Where"
          defaultValue=''
        ></input>
        <input
          name="distanceFrom"
          ref={register}
          placeholder="how far?"
          defaultValue=''
        ></input>
        <input
          name="minimumSalary"
          ref={register}
          placeholder="Approximate salary"
          defaultValue=''
        ></input>
        <button type="submit">Search</button>
      </form>
      {displayBtn()}
    </div>
  )
}
