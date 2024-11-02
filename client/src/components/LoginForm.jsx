import AccountForm from "./AccountForm";

export default function LoginForm({ show, onHide, setShowSignupForm }) {
  return (
    <AccountForm
      show={show}
      onHide={onHide}
      setShowSignupForm={setShowSignupForm}
    />
  );
}
