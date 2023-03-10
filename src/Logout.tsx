import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function Logout() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    setCurrentUser({});
  });

  return (
    <>
      <div id="logout">
        <Navigate replace to="/login" />
      </div>
    </>
  );
}

export default Logout;
