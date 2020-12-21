import React from 'react';
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

interface Props {
  children: any
}

const Auth0ProviderWithHistory: React.FC<Props> = ({ children }) => {
  const domain: any = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId: any = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience: any = process.env.REACT_APP_AUTH0_AUDIENCE;

  const history = useHistory();

  const onRedirectCallback = (appState: any) => {
    console.log('TAKING USERS BACK TO:', appState, window.location.pathname)
    history.push(appState?.targetUrl || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;