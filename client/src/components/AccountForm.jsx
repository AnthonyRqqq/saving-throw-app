import { useState } from "react";
import { validateEmail } from "../utils/validateEmail";
import { useMutation } from "@apollo/client";
import { ADD_USER, LOGIN_USER } from "../utils/mutations";
import { Modal } from "react-bootstrap";
import Auth from "../utils/auth";

export default function AccountForm({
  show,
  onHide,
  signup = false,
  setShowSignupForm,
  setShowLogin,
  afterLogin,
  verifyLogin,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Define mutations
  const [createUser] = useMutation(ADD_USER);
  const [loginUser] = useMutation(LOGIN_USER);

  // Handles updating the value of the correct variable
  const handleInputChange = async (e) => {
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
    e.preventDefault();

    if (!validateEmail(email))
      return setErrorMessage("Please enter a valid email address.");

    if (signup && password !== verifyPassword)
      return setErrorMessage("Password and Verify Password fields must match.");

    try {
      if (signup) {
        const createResponse = await createUser({
          variables: { email, password },
        });

        if (createResponse.error) {
          throw new Error("Error creating user: ", createResponse.error);
        }
      }

      const loginResponse = await loginUser({
        variables: { email, password },
      });

      const token = await loginResponse.data.login.token;

      await Auth.login(token);
      handleOnHide();
      if (afterLogin) await afterLogin();
      return;
    } catch (e) {
      console.error(e);
      if (signup)
        return setErrorMessage("Error creating account. Please try again.");
      else
        return setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  const handleOnHide = async () => {
    setErrorMessage("");
    setPassword("");
    setVerifyPassword("");
    setEmail("");
    onHide();
  };

  const formField = ({ input, inputName, placeHolder, type }) => {
    return (
      <div className="row justify-content-center">
        <input
          className="col-10 loginInput"
          value={input}
          name={inputName}
          onChange={handleInputChange}
          type={type || inputName}
          placeholder={placeHolder}
          required
        />
      </div>
    );
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleOnHide}
        className="centeredModal modalBorder "
      >
        <div className="form-div">
          <h3 className="row justify-content-center m-0 pb-3">
            {signup ? "Create Account" : "Login"}
          </h3>
        </div>

        {verifyLogin && (
          <div className="form-div" style={{ textAlign: "center" }}>
            You must be logged in to cast this spell.
          </div>
        )}

        <form
          onSubmit={handleFormSubmit}
          className="signup-form justify-content-center form-div"
        >
          {formField({
            input: email,
            inputName: "email",
            placeHolder: "Email",
          })}

          {formField({
            input: password,
            inputName: "password",
            placeHolder: "Password",
          })}

          {signup &&
            formField({
              input: verifyPassword,
              inputName: "verifyPassword",
              type: "password",
              placeHolder: "Verify Password",
            })}

          <div className="row justify-content-center">
            <button
              className="col-3 justify-content-center rounded"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="pb-2 d-flex justify-content-center form-div">
          <span
            className="signup-text"
            onClick={async () => {
              if (signup) setShowLogin(true);
              else setShowSignupForm(true);

              handleOnHide();
            }}
          >
            {signup
              ? "I have an account! Take me to login!"
              : "Not signed up yet? Click here!"}
          </span>
        </div>

        {errorMessage && (
          <div className="form-div">
            <p className="error-text row justify-content-center">
              {errorMessage}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}
