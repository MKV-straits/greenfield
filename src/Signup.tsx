import { useState } from "react";
import axios from "axios";

function Signup() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const { username, password } = input;

  function handleChange(event) {
    return setInput({ ...input, [event.target.name]: event.target.value });
  }
  function handleSubmit(event) {
    event.preventDefault();
    console.log("handling submit", input);
    axios.post("/user", input).then(() => {
      console.log(`welcome ${input.username}`);
    });
  }

  return (
    <div>
      Signup
      <form className="signup" id="signup" onSubmit={handleSubmit}>
        <label htmlFor="signup" id="username">
          username
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={username}
          />
        </label>

        <br />
        <label htmlFor="signup" id="password">
          password
          <input
            type="text"
            name="password"
            onChange={handleChange}
            value={password}
          />
        </label>

        <br />
        <label htmlFor="submit" id="submit">
          <input type="submit" name="submit" />
        </label>
      </form>
    </div>
  );
}

export default Signup;
