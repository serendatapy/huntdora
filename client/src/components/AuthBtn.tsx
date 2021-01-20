import React from "react";

import { AuthLoginBtn } from "./AuthLoginBtn";
import { AuthLogoutBtn } from "./AuthLogoutBtn";

import { useAuth0 } from "@auth0/auth0-react";

/**
 * AuthBtn decides whether to display Login or Logout Button
 * based on users authenticated status
 */
export const AuthBtn = () => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? <AuthLogoutBtn /> : <AuthLoginBtn />;
};