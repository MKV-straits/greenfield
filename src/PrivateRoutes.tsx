import { Outlet, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const PrivateRoutes = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  return currentUser.accessToken?.length ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
