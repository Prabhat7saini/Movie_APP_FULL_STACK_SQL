import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../redux/store";

interface OpenRouteProps {
  children: React.ReactNode;
}

const OpenRoute: React.FC<OpenRouteProps> = ({ children }) => {
  const { token } = useSelector((state: RootState) => state.auth);

  if (!token ) {
    return <>{children}</>;
  } else {
    console.log(token,"lkjh")
    return <Navigate to="/favmovie" />;
  }
};

export default OpenRoute;
