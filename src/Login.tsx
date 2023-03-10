import { useState, useEffect, useRef, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";

function Login() {
  // const [currentUser, setCurrentUser] = useState(null);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  // const userRef = useRef();
  // const errRef = useRef();

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [username, password]);

  function handleUserChange(event) {
    return setUsername(event.target.value);
  }
  function handlePasswordChange(event) {
    return setPassword(event.target.value);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "/auth/access",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      const accessToken = response?.data?.accessToken;
      await axios.post(
        "/auth/signin",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setCurrentUser({ username, password, accessToken });

      console.log(username);
      console.log("current user: ", currentUser);
      setUsername("");
      setPassword("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        console.error(err);
        setErrorMessage("no server response");
      } else if (err.response?.status === 400) {
        setErrorMessage("missing username or password");
      } else if (err.response?.status === 401) {
        setErrorMessage("aint authorized");
      } else {
        setErrorMessage("login failed");
      }
      errRef.current.focus();
    }
  };

  // event.preventDefault();
  // console.log("handling submit", input);
  // axios.post("/authenticate", input).then((response) => {
  //   console.log("response: ", response.data);
  //   setInput({ ...input, username: "", password: "" });
  //   setSuccess(true);
  // });

  return (
    <>
      {success ? <Navigate replace to="/" /> : ""}
      <section>
        <p ref={errRef}>{errorMessage ? errorMessage : ""}</p>
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              id="username"
              ref={userRef}
              onChange={handleUserChange}
              value={username}
              required
            />
          </label>
          <label htmlFor="username">
            Password:
            <input
              type="password"
              id="password"
              ref={userRef}
              onChange={handlePasswordChange}
              value={password}
              required
            />
          </label>
          <button>Sign in</button>
        </form>
      </section>
    </>
  );
}

export default Login;
