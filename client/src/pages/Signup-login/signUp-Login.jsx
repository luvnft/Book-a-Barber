
import LeftSide from "../../components/signup-login/left-signup";
import RightSideSIgnUp from "../../components/signup-login/right-signup";
import "./signUp-Login.css";

const SignUpLogin = () => {
  return (
    <div className="signup-login-parent">
      <LeftSide />
      <RightSideSIgnUp />
    </div>
  );
};

export default SignUpLogin;
