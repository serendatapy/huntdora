import React from "react";

import { LoginButton } from "./AuthLoginBtn";
import { LogoutButton } from "./AuthLogoutBtn";

import { useAuth0 } from "@auth0/auth0-react";

export const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <LogoutButton /> : <LoginButton />;
};