import React, { useState } from "react";
import { accountService } from "@/services/account.service";
import Alert from "../Alert";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPassword = () => {
  const [isServerError, setIsServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    setShowAlert(false);
  };

  const forgotPassword = async (data) => {
    const { email } = data;
    await accountService
      .forgetPassword(email)
      .then((res) => {
        if (res.isSuccess && res.data) {
          setShowAlert(true);
          setIsLoading(true);
        }
      })
      .catch((errorMessage) => {
        setShowAlert(true);
        setIsLoading(false);
        setIsServerError(errorMessage);
      });
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-md">
          <div className="container mx-auto">
            {showAlert && (
              <Alert
                type={isServerError ? "error" : "success"}
                message={
                  isServerError
                    ? isServerError
                    : "Reset password mail sent successfully."
                }
                onClose={handleClose}
              />
            )}
          </div>
          <h2 className="text-2xl font-semibold mb-6">Forgot Your Password?</h2>
          <p className="text-gray-600 mb-6">
            Enter your email address below and we'll send you a link to reset
            your password.
          </p>
          <form onSubmit={handleSubmit(forgotPassword)}>
            <div className="mb-4">
              {/* <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label> */}
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your register email address"
                {...register("email")}
                className={`mt-1 p-2 w-full border rounded-md ${
                  errors?.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors?.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors?.email.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Send Reset Link
            </button>
          </form>

          <div className=" my-6">
            <Link
              href="/signin"
              className="flex items-center justify-center text-gray-600 hover:text-gray-800"
            >
              <FaArrowLeft className="mr-2" /> Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
