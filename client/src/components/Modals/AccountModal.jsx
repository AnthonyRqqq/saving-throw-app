import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";
import { useState, useEffect } from "react";

export default function AccountModal({
  afterLogin,
  verifyLogin,
  onHide = () => {},
}) {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignupForm, setShowSignupForm] = useState(false);

  useEffect(() => {
    if (!showLogin && !showSignupForm) onHide();
  }, [showLogin, showSignupForm]);

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
