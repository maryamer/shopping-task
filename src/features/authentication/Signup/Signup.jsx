import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../../../ui/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../ui/Button";
import { BsPerson } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Logo from "../../../ui/Logo";

const schema = yup
  .object({
    name: yup.string().min(5).required("Please Enter Your Name"),
    email: yup.string().email().required("Please Enter Your Email"),
    password: yup.string().required("Please Enter Password"),
  })
  .required();

function SingupForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [, setError] = useState(null); // State for errors

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onTouched" });

  const onSubmit = async (values) => {
    setIsLoading(true); // Start loading
    setError(null); // Clear previous errors

    try {
       
      const response = await axios.post(
        "https://assignment.rahkartest.ir/api/register",
        values
      );  
      console.log("Registration success:", response.data);
      toast.success("successfully registered");
      navigate("/signin");
      
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error("Registration failed. Please try again.");
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);  
    }
  };

  return (
    <div className="max-w-sm  space-y-32 lg:pace-y-12 px-3 lg:px-0">
      <Logo />
      <div className="space-y-5">
        <h1 className="text-2xl font-semibold text-secondary-800 text-center mb-6">
          Register{" "}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <TextField
            label="User Name"
            icon={<BsPerson className="w-5 h-5 text-secondary-400" />}
            name="name"
            placeholder={"Type Here"}
            errors={errors}
            register={register}
            type="text"
          />
          <TextField
            icon={<AiOutlineMail className="w-5 h-5 text-secondary-400" />}
            label="Email Address"
            name="email"
            placeholder={"Type Here"}
            errors={errors}
            register={register}
            type="text"
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
          to="/signin"
          className="text-secondary-400 text-sm w-full flex items-center justify-center mt-2 hover:text-primary-500 text-center"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default SingupForm;
