import AccountForm from "./AccountForm";

export default function SignupForm({ show, onHide, setShowLogin }) {
  return (
    <AccountForm
      show={show}
      onHide={onHide}
      setShowLogin={setShowLogin}
      signup
    />
  );
}
