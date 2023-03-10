import { useState, useRef, useEffect } from "react";
import axios from "axios";

// const USER_REGEX = /^[a-zA-Z][a-zA_Z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const easyUserRegex = /^[a-zA-Z][a-zA_Z0-9-_]{2,23}$/;
const easyPasswordRegex = /^[a-zA-Z][a-zA_Z0-9-_]{2,23}$/;

function Signup() {
  // const userRef = useRef<HTMLInputElement>(null);
  // const errRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  // const [success, setSuccess] = useState(false);

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
        console.log(response.data);
        // setSuccess(true);
        setUsername("");
        setPassword("");
        setMatchPassword("");
      });
  };

  return (
    <section>
      {/* <p
        ref={errRef}
        className={errorMessage ? "error-message" : "offscreen"}
        aria-live="assertive"
      >
        {errorMessage}
      </p> */}
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            id="username"
            // ref={userRef}
            autoComplete="off"
            onChange={handleUserChange}
            value={username}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="usernote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p id="usernote">{userFocus && username && !validName ? "" : ""}</p>
        </label>
        <label htmlFor="password">
          Password:
          <input
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
          <p id="pwdnote">
            {passwordFocus && password && !validPassword
              ? "8 to 24 characters. Must include lowercase and uppercase letters, a number, and a special character."
              : ""}
          </p>
        </label>
        <label htmlFor="confirm-password">
          Confirm password:
          <input
            type="password"
            id="confirm-password"
            onChange={handleMatchPasswordChange}
            value={matchPassword}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
        </label>
        <button
          disabled={!validName || !validPassword || !validMatch ? true : false}
        >
          Sign up
        </button>
      </form>
    </section>
  );
}

export default Signup;
