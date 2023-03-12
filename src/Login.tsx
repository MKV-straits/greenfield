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
      const user = response?.data?.dbUser;
      await axios.post(
        "/auth/signin",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setCurrentUser({
        username,
        password,
        stats: user.stats,
        token: user.token,
      });

      console.log("current user from login page: ", user);
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
      <section className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="username"
                ref={userRef}
                onChange={handleUserChange}
                value={username}
                required
              />
            </label>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Password:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                id="password"
                ref={userRef}
                onChange={handlePasswordChange}
                value={password}
                required
              />
            </label>
          </div>
          <br />
          <div className="flex items-center justify-between">
            <button className="object-none object-left-bottom bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Sign in
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
