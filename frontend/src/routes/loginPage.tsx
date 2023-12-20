import { useAuth } from "../components/AuthProvider";

export default function LandingPage() {
  const { login, isAuthenticated } = useAuth();
  

  const handleLogin = () => {
    login();
  }

  return (
    <div>
      <h1>Login Page</h1>
      <p>Click the button below to login!</p>
      <p>Is authenticated? {isAuthenticated ? "Yes" : "No"}</p>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}