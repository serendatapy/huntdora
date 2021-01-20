import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from "@material-ui/core/IconButton/IconButton";


export const LogoutButton = () => {

  const { logout } = useAuth0();
  return (
    <IconButton
      style={{ color: '#bad9a4' }}
      aria-label="Log Out"
      component="button"
      onClick={() => {
        sessionStorage.clear();
        logout({
          returnTo: window.location.origin,
        })
      }
      }
    >
      <AccountCircleIcon fontSize='large' />
    </IconButton>
  );
};