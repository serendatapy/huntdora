import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import IconButton from "@material-ui/core/IconButton/IconButton";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


export const AuthLoginBtn = () => {

  const { loginWithRedirect } = useAuth0();
  return (
    <IconButton
      style={{ color: 'rgb(102 109 130)' }}
      aria-label="Log In"
      component="button"
      onClick={() => loginWithRedirect({ appState: { targetUrl: window.location.pathname } })}
    >
      <AccountCircleIcon fontSize='large' />
    </IconButton>
  );
};