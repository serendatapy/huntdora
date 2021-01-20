import React from "react";

import { AuthLoginBtn } from "./AuthLoginBtn";
import { AuthLogoutBtn } from "./AuthLogoutBtn";

import { useAuth0 } from "@auth0/auth0-react";

export const AuthBtn = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <AuthLogoutBtn /> : <AuthLoginBtn />;
};