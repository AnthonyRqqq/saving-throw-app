import { useState } from "react";
import { validateEmail } from "../utils/validateEmail";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [loginUser] = useMutation(LOGIN_USER);

  const navigateTo = useNavigate();

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === "email") {
      setEmail(inputValue);
    } else {
      setPassword(inputValue);
    }
  };

  const handleFormSubmit = async (e) => {
    // Prevents page refresh
    e.preventDefault();

    // Checks for valid email
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    try {
      const response = await loginUser({
        variables: { email: email, password: password },
      });

      if (response.error) {
        throw new Error("Something went wrong");
      }
      const token = await response.data.login.token;
      await Auth.login(token);
    } catch (err) {
      console.error(err);
    }

    // Clear form fields and error message if complete
    setEmail("");
    setErrorMessage("");
    setPassword("");

    // Redirect to homepage
    navigateTo("/");
  };

  return (
    <div className="form-div">
      <h3 className="row justify-content-center m-0 pb-3">Login</h3>
      <form
        className="signup-form justify-content-center"
        onSubmit={handleFormSubmit}
      >
        {/* Input field for email */}
        <div className="row justify-content-center">
          <input
            className="col-sm-8 col-lg-3 col-8 loginInput"
            value={email}
            name="email"
            onChange={handleInputChange}
            type="email"
            placeholder="email"
            required
          />
        </div>

        {/* Input field for password */}
        <div className="row justify-content-center">
          <input
            className="col-sm-8 col-lg-3 col-8 loginInput"
            value={password}
            name="password"
            onChange={handleInputChange}
            type="password"
            placeholder="password"
            required
          />
        </div>

        {/* Submit button */}
        <div className="row justify-content-center">
          <button className="col-lg-1 col-sm-3 col-3 justify-content-center" type="submit">
            Submit
          </button>
        </div>
      </form>
      {errorMessage && (
        <div>
          <p className="error-text row justify-content-center">
            {errorMessage}
          </p>
        </div>
      )}
    </div>
  );
}
