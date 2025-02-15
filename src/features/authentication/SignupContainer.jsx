import { useEffect } from "react";
import useUser from "./useUser";
import { useNavigate } from "react-router-dom";
import SingupForm from "./Signup/Signup";

function SignupContainer() {
  const navigate = useNavigate();
  const { user } = useUser();

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
