import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../../../ui/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../ui/Button";
import { AiOutlineMail } from "react-icons/ai";
import {  useState } from "react";
import toast from "react-hot-toast";
import Logo from "../../../ui/Logo";
import Cookies from "js-cookie"; // Import js-cookie
import http from "../../../services/httpService";

const schema = yup
  .object({
    email: yup.string().email().required("Please Enter Your Email"),
    password: yup.string().required("Please Enter Password"),
  })
  .required();

function SinginForm() {
  // const [isFirst, setIsFirst] = useState(true);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!isFirst) {
  //     setTimeout(() => {
  //       navigate("/admin/category");
  //     }, 1000);
  //   }
  // }, [isFirst]);
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [error, setError] = useState(null); // State for errors
  console.log(error);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onTouched" });

  const onSubmit = async (values) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await http.post(
        "https://assignment.rahkartest.ir/api/login",
        values
      );
      console.log("Login success:", response.data);
      const { token } = response?.data || {};
      const { user } = response?.data || {};
      user && localStorage.setItem("userInfo", JSON.stringify(user));
      console.log(user, "user");
      Cookies.set("Authorization", `Bearer ${token}`, { expires: 4 / 24 }); // Expires in 1 hour
      toast.success("Successfully logged in!");
       navigate("/admin/category");

    } catch (err) {
      console.error("Login failed:", err.response?.data?.message);
      toast.error("Login failed:"+ err.response?.data?.message)
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="max-w-sm space-y-32 lg:pace-y-12 px-3 lg:px-0">
      <Logo />
      <div className="space-y-5">
        <h1 className="text-2xl font-semibold text-secondary-800 text-center mb-6">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <TextField
            icon={<AiOutlineMail className="w-5 h-5 text-secondary-400" />}
            label="Email Address"
            name="email"
            placeholder={"Type Here"}
            errors={errors}
            register={register}
            type="email"
          />
          <TextField
            label="Password"
            placeholder={"Type Here"}
            name="password"
            errors={errors}
            register={register}
            type="password"
          />
          <p className="text-secondary-500 mt-2 text-sm">
            By signing in or registering, I accept the{" "}
            <Link className="link">terms</Link> and{" "}
            <Link className="link">conditions</Link> of use of Apin and its
            privacy policy.
          </p>
          <div className="">
            {isLoading ? (
              <Button
                type="button"
                className="py-3 px-4 btn btn--primary rounded-md w-full"
              >
                Loading...{" "}
              </Button>
            ) : (
              <Button
                type="submit"
                className="py-3 px-4 btn btn--primary rounded-md w-full"
              >
                Submit{" "}
              </Button>
            )}
          </div>
        </form>

        <Link
          to="/signup"
          className="text-secondary-400 text-sm w-full flex items-center justify-center mt-2 hover:text-primary-500 text-center"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}

export default SinginForm;
