import SinginFrom from "./SignIn/Signin";

function SigninContainer() {
  return (
    <div className="w-full h-screen flex ">
      <div className="flex-1 flex h-full items-center justify-center">
        <SinginFrom />
      </div>
      <div className="flex-1 hidden lg:block bg-primary-800"></div>
    </div>
  );
}
export default SigninContainer;
