import { useState } from "react";
import { validateEmail } from "../utils/validateEmail";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER, LOGIN_USER } from "../utils/mutations";
import { Modal } from "react-bootstrap";
import Auth from "../utils/auth";

export default function SignupForm({ show, onHide, setShowLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Define mutation
  const [createUser] = useMutation(ADD_USER);
  const [loginUser] = useMutation(LOGIN_USER);

  const navigateTo = useNavigate();

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    switch (inputType) {
      case "email":
        setEmail(inputValue);
        break;
      case "password":
        setPassword(inputValue);
        break;
      case "verifyPassword":
        setVerifyPassword(inputValue);
        break;
    }
  };

  const handleFormSubmit = async (e) => {
    // Prevents page refresh
    e.preventDefault();

    // Checks for valid email
    if (!validateEmail(email)) {
      return setErrorMessage("Please enter a valid email address");
    }

    if (password !== verifyPassword || !password || !verifyPassword) {
      return setErrorMessage("Password and Verify Password must match.");
    }

    try {
      const createResponse = await createUser({
        variables: { email: email, password: password },
      });

      if (createResponse.error) {
        throw new Error("Something went wrong");
      }

      const loginResponse = await loginUser({
        variables: { email: email, password: password },
      });
      const { token } = await loginResponse.data.login.token;

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

  const handleOnHide = async () => {
    setEmail("");
    setErrorMessage("");
    setPassword("");
    setVerifyPassword("");
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={handleOnHide}
      className="centeredModal modalBorder"
    >
      <div className="form-div">
        <h3 className="row justify-content-center m-0 pb-3">Create Account</h3>
        <form
          className="signup-form justify-content-center"
          onSubmit={handleFormSubmit}
        >
          {/* Input field for email */}
          <div className="row justify-content-center">
            <input
              className="col-8 loginInput"
              value={email}
              name="email"
              onChange={handleInputChange}
              type="email"
              placeholder="Email"
              required
            />
          </div>

          {/* Input field for password */}
          <div className="row justify-content-center">
            <input
              className="col-8 loginInput"
              value={password}
              name="password"
              onChange={handleInputChange}
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <div className="row justify-content-center">
            <input
              className="col-8 loginInput"
              value={verifyPassword}
              name="verifyPassword"
              onChange={handleInputChange}
              type="password"
              placeholder="Verify Password"
              required
            />
          </div>

          {/* Submit button */}
          <div className="row justify-content-center">
            <button className="col-3 justify-content-center" type="submit">
              Submit
            </button>
          </div>
        </form>

        <div className="pb-2 d-flex justify-content-center">
          <span
            className="signup-text"
            onClick={async () => {
              setShowLogin(true);
              handleOnHide();
            }}
          >
            I have an account! Take me to login!
          </span>
        </div>

        {errorMessage && (
          <div>
            <p className="error-text row justify-content-center">
              {errorMessage}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
