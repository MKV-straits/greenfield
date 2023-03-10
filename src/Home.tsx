import { useContext } from "react";
import { UserContext } from "./UserContext";

function Home() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  return (
    <>
      <div className="welcome">
        <h2>Welcome</h2>
        <pre>{currentUser.username}</pre>
      </div>
    </>
  );
}

export default Home;
