import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signIn } from "next-auth/react";
import Alert from "../Alert";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function SignIn() {
  const [isServerError, setIsServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleClose = () => {
    setShowAlert(false);
  };

  const onSubmit = async (data) => {
    console.log(data, errors);
    ;
    const email = data.email;
    const password = data.password;

    await signIn("credentials", {
      email,
      password,
      redirect: false, // prevent automatic redirection
    })
      .then((res) => {
        ;
        localStorage.setItem("user", JSON.stringify(res));
        // Handle result, redirect if successful, show error otherwise
        if (res?.error) {
          setShowAlert(true);
          setIsServerError(res?.error);
        } else {
          // Redirect user to desired page (e.g., dashboard) after successful sign-in
          window.location.href = "/";
        }
      })
      .catch((errorMessage) => {
        setShowAlert(true);
        setIsServerError(errorMessage);
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="my-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="my-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="container mx-auto">
              {showAlert && (
                <Alert
                  type={isServerError ? "error" : "success"}
                  message={
                    isServerError ? isServerError : "Signin successfully."
                  }
                  onClose={handleClose}
                />
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  {...register("email", { required: true })}
                  autoComplete="email"
                  className="bg-transparent block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  {...register("password", { required: true })}
                  autoComplete="password"
                  className="bg-transparent block w-full rounded-md border-0 py-1. px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md outline outline-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              href="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              create new account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
