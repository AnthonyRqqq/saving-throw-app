import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";
import { useState } from "react";

export default function AccountModal({ afterLogin, verifyLogin }) {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignupForm, setShowSignupForm] = useState(null);

  return (
    <>
      <LoginForm
        show={showLogin}
        setShowSignupForm={setShowSignupForm}
        onHide={() => setShowLogin(false)}
        afterLogin={afterLogin}
        verifyLogin={verifyLogin}
      />
      <SignupForm
        show={showSignupForm}
        setShowLogin={setShowLogin}
        onHide={() => setShowSignupForm(false)}
        afterLogin={afterLogin}
        verifyLogin={verifyLogin}
      />
    </>
  );
}
