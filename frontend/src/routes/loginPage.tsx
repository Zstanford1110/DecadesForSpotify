
interface LoginProps {
  handleAuthentication: () => void;
}

export default function LoginPage({ handleAuthentication }: LoginProps) {

  const handleLogin = () => {
    // Make this do something :)
    handleAuthentication();
  };

  return (
    <div>
      <h1>Login Page</h1>
      <p>Click the button below to login!</p>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}