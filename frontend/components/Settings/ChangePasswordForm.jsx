import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .min(8, "New password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Handle form submission
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 ">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            {...register("currentPassword")}
            className={`w-full border ${
              errors.currentPassword ? "border-red-500" : "border-gray-300"
            } rounded-md p-2`}
          />
          {errors.currentPassword && (
            <p className="text-red-500 mt-1">
              {errors.currentPassword.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            {...register("newPassword")}
            className={`w-full border ${
              errors.newPassword ? "border-red-500" : "border-gray-300"
            } rounded-md p-2`}
          />
          {errors.newPassword && (
            <p className="text-red-500 mt-1">{errors.newPassword.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            {...register("confirmPassword")}
            className={`w-full border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded-md p-2`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
