import { useState } from "react";
// import AuthContext from "./context/AuthProvider";
import axios from "axios";

function Login() {
  // const { setAuth } = useContext(AuthContext);
  // const userRef = useRef();
  // const errRef = useRef();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  // const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);
  // useEffect(() => {
  //   setErrMsg("");
  // }, [input.username, input.password]);

  const { username, password } = input;

  function handleChange(event) {
    return setInput({ ...input, [event.target.name]: event.target.value });
  }
  function handleSubmit(event) {
    event.preventDefault();
    console.log("handling submit", input);
    axios.post("/authenticate", input).then((response) => {
      console.log("response: ", response.data);
      setInput({ ...input, username: "", password: "" });
      setSuccess(true);
    });
  }
  return (
    <>
      {success ? (
        <section>
          <h1>success</h1>
          <br />
          <p>
            <a>welcome</a>
          </p>
        </section>
      ) : (
        <div>
          Login
          <form className="login" id="login" onSubmit={handleSubmit}>
            <label htmlFor="login" id="username">
              username
              <input
                type="text"
                name="username"
                onChange={handleChange}
                value={username}
                required
              />
            </label>

            <br />
            <label htmlFor="login" id="password">
              password
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={password}
                required
              />
            </label>
            <br />
            <label htmlFor="submit" id="submit">
              <input type="submit" name="submit" />
            </label>
          </form>
        </div>
      )}
    </>
  );
}

export default Login;
