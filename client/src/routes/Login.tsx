import "./Login.css";

function Login() {
  return (
    <div className="login-container">
      <div className="title-login">
        <h3>Log In To Your Account</h3>
      </div>
      <div className="login-input">
        <input type="text" placeholder="Email or Username"></input>
        <input type="password" placeholder="Password"></input>
      </div>
      <div className="loginbtn">
        <button>Log In</button>
      </div>
    </div>
  );
}

export default Login;
