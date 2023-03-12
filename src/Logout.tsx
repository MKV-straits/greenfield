import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";

function Logout() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    axios
      .post("/user/stats", currentUser)
      .then((response) => console.log(response));
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
