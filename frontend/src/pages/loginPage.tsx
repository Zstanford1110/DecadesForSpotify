import { login } from "../utils/authUtils";

export default function LandingPage() {

  const handleLogin = () => {
    login();
  }

  return (
    <div>
      <h1>Login Page</h1>
      <p>Click the button below to login!</p>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}