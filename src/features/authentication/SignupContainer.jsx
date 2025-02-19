import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SingupForm from "./Signup/Signup";
import { useAuth } from "../../context/useAuthStore";

function SignupContainer() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  return (
    <div className="w-full h-screen flex ">
      <div className="flex-1 flex h-full items-center justify-center">
        <SingupForm />
      </div>
      <div className="flex-1 hidden lg:block bg-primary-800"></div>
    </div>
  );
}
export default SignupContainer;
