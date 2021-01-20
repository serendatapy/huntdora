import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ScreenLoading } from "../components/ScreenLoading";

interface Props {
  component: any
}

const ProtectedRoute: React.FC<Props> = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <ScreenLoading />,
    })}
    {...args}
  />
);

export default ProtectedRoute;