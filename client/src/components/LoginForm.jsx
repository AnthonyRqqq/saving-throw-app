import { useState } from "react";
import { validateEmail } from "../utils/validateEmail";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { Modal } from "react-bootstrap";
import Auth from "../utils/auth";

export default function LoginForm({ show, onHide, setShowSignupForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

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
        setErrorMessage("Error logging in.");
        console.log("error message");
        throw new Error("Something went wrong");
      }
      const token = await response.data.login.token;
      await Auth.login(token);
      onHide();
    } catch (err) {
      setErrorMessage("Invalid email or password. Please try again.");
      return;
    }

    // Clear form fields and error message if complete
    setEmail("");
    setErrorMessage(null);
    setPassword("");

    // Redirect to homepage
    navigateTo("/");
  };

  const handleOnHide = async () => {
    setErrorMessage(null);
    setPassword("");
    setEmail("");
    onHide();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleOnHide}
        className="centeredModal modalBorder"
      >
        <div className="form-div">
          <h3 className="row justify-content-center m-0 pb-3">Login</h3>
          <form
            className="signup-form justify-content-center"
            onSubmit={handleFormSubmit}
          >
            {/* Input field for email */}
            <div className="row justify-content-center">
              <input
                className="col-10 loginInput"
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
                className="col-10 loginInput"
                value={password}
                name="password"
                onChange={handleInputChange}
                type="password"
                placeholder="Password"
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
                setShowSignupForm(true);
                handleOnHide();
              }}
            >
              Not signed up yet? Click here!
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
    </>
  );
}
