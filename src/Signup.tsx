import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

// const USER_REGEX = /^[a-zA-Z][a-zA_Z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const easyUserRegex = /^[a-zA-Z][a-zA_Z0-9-_]{2,23}$/;
const easyPasswordRegex = /^[a-zA-Z][a-zA_Z0-9-_]{2,23}$/;

function Signup() {
  // const userRef = useRef<HTMLInputElement>(null);
  // const errRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  // const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  // const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  // const [matchFocus, setMatchFocus] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // console.log(userRef);
    // userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = easyUserRegex.test(username);
    setValidName(result);
  }, [username]);

  useEffect(() => {
    const result = easyPasswordRegex.test(password);
    setValidPassword(result);
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrorMessage("");
  }, [username, password, matchPassword]);

  const handleUserChange = (event) => {
    return setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    return setPassword(event.target.value);
  };
  const handleMatchPasswordChange = (event) => {
    return setMatchPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    return axios
      .post("/auth/signup", { username, password })
      .then((response) => {
        if (response) {
          setSuccess(true);
          setUsername("");
          setPassword("");
          setMatchPassword("");
        }
        console.log("user from signup: ", response.data);
      });
  };

  return (
    <>
      {success ? <Navigate replace to="/login" /> : ""}
      <section className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
                // ref={userRef}
                autoComplete="off"
                onChange={handleUserChange}
                value={username}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="usernote"
                // onFocus={() => setUserFocus(true)}
                // onBlur={() => setUserFocus(false)}
              />
            </label>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                id="password"
                // ref={userRef}
                onChange={handlePasswordChange}
                required
                value={password}
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="pwdnote"
                // onFocus={() => setPasswordFocus(true)}
                // onBlur={() => setPasswordFocus(false)}
              />
              <p id="pwdnote"></p>
            </label>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirm-password"
            >
              Confirm password:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                id="confirm-password"
                onChange={handleMatchPasswordChange}
                value={matchPassword}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                // onFocus={() => setMatchFocus(true)}
                // onBlur={() => setMatchFocus(false)}
              />
            </label>
          </div>
          <button
            className="object-none object-left-bottom bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={
              !validName || !validPassword || !validMatch ? true : false
            }
          >
            Sign up
          </button>
        </form>
      </section>
    </>
  );
}

export default Signup;
