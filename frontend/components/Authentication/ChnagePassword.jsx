import React, { useState } from "react";
import { accountService } from "@/services/account.service";
import Alert from "../Alert";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  currentPassword: yup.string().required("Current Password is required"),
  newPassword: yup
    .string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmNewPassword: yup
    .string()
    .required("Confirm New Password is required")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

const ChangePassword = () => {
  const [isServerError, setIsServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    setShowAlert(false);
  };

  const changePassword = async (data) => {
    const { currentPassword, newPassword } = data;

    await accountService
      .changePassword({ currentPassword, newPassword })
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
                    : "Password changed successfully."
                }
                onClose={handleClose}
              />
            )}
          </div>
          <h2 className="text-2xl font-semibold mb-6">Change Your Password</h2>
          <form onSubmit={handleSubmit(changePassword)}>
            <div className="mb-4">
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                placeholder="Enter your current password"
                {...register("currentPassword")}
                className={`mt-1 p-2 w-full border rounded-md ${
                  errors?.currentPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors?.currentPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors?.currentPassword.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Enter your new password"
                {...register("newPassword")}
                className={`mt-1 p-2 w-full border rounded-md ${
                  errors?.newPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors?.newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors?.newPassword.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                placeholder="Confirm your new password"
                {...register("confirmNewPassword")}
                className={`mt-1 p-2 w-full border rounded-md ${
                  errors?.confirmNewPassword
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors?.confirmNewPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors?.confirmNewPassword.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Change Password
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

export default ChangePassword;
