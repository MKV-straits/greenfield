import { useState, useRef, useEffect } from "react";
import axios from "axios";

// const USER_REGEX = /^[a-zA-Z][a-zA_Z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const easyUserRegex = /^[a-zA-Z][a-zA_Z0-9-_]{2,23}$/;
const easyPasswordRegex = /^[a-zA-Z][a-zA_Z0-9-_]{2,23}$/;

function Signup() {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  // const [matchFocus, setMatchFocus] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  // const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = easyUserRegex.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = easyPasswordRegex.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrorMessage("");
  }, [user, password, matchPassword]);

  const handleUserChange = (event) => {
    return setUser(event.target.value);
  };
  const handlePasswordChange = (event) => {
    return setPassword(event.target.value);
  };
  const handleMatchPasswordChange = (event) => {
    return setMatchPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    return axios.post("/user", { user, password }).then((response) => {
      console.log(response.data);
      // setSuccess(true);
      setUser("");
      setPassword("");
      setMatchPassword("");
    });
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errorMessage ? "error-message" : "offscreen"}
        aria-live="assertive"
      >
        {errorMessage}
      </p>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            // onChange={(event) => setUser(event.target.value)}
            onChange={handleUserChange}
            value={user}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p id="uidnote">
            {userFocus && user && !validName
              ? "4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed."
              : ""}
          </p>
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            ref={userRef}
            // onChange={(event) => setPassword(event.target.value)}
            onChange={handlePasswordChange}
            required
            value={password}
            aria-invalid={validPassword ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
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
            // onChange={(event) => setMatchPassword(event.target.value)}
            onChange={handleMatchPasswordChange}
            value={matchPassword}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            // onFocus={() => setMatchFocus(true)}
            // onBlur={() => setMatchFocus(false)}
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
