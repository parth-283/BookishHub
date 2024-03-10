import React, { useState } from "react";
import { accountService } from "@/services/account.service";
import Alert from "../Alert";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const ResetPassword = () => {
  const router = useRouter();
  const [isServerError, setIsServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { token } = router.query;

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    setShowAlert(false);
  };

  const resetPassword = async (data) => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      setIsServerError("Passwords do not match");
      setShowAlert(true);
      return;
    }

    await accountService
      .resetPassword({ newPassword: password, token })
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
                  isServerError ? isServerError : "Password reset successful."
                }
                onClose={handleClose}
              />
            )}
          </div>
          <h2 className="text-2xl font-semibold mb-6">Reset Your Password</h2>
          <form onSubmit={handleSubmit(resetPassword)}>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your new password"
                {...register("password")}
                className={`mt-1 p-2 w-full border rounded-md ${
                  errors?.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors?.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors?.password.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your new password"
                {...register("confirmPassword")}
                className={`mt-1 p-2 w-full border rounded-md ${
                  errors?.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors?.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors?.confirmPassword.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Reset Password
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

export default ResetPassword;
