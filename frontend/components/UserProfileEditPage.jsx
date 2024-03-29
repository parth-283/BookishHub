import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { userService } from "@/services/user.service";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UserProfileEditPage = (props) => {
  const router = useRouter();
  const { slug } = router.query;
  const [isEdit, setIsEdit] = useState(false);
  const fileInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      firstName: props.userProfile?.firstName || "",
      lastName: props.userProfile?.lastName || "",
      email: props.userProfile?.email || "",
      city: props.userProfile?.city || "",
      state: props.userProfile?.state || "",
      country: props.userProfile?.country || "",
      dob: props.userProfile?.dob || null,
      address: props.userProfile?.address || "",
      phone: props.userProfile?.phone || "",
      about: props.userProfile?.about || "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      country: Yup.string().required("Country is required"),
      dob: Yup.date().nullable().required("Date of birth is required"),
      address: Yup.string().required("Address is required"),
      phone: Yup.string().required("Phone number is required"),
      about: Yup.string().required("About is required"),
    }),
    onSubmit: async (values) => {
      ;
      try {
        userService.UpdateProfile(props.userProfile.id, values).then((res) => {
          console.log(res, "RES>>>>>>>");
        });
      } catch (error) {
        console.log(error, "error");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-6 bg-gray-100 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="text-red-500 mt-1">{formik.errors.firstName}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="text-red-500 mt-1">{formik.errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 my-4">
          <div>
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700"
            >
              About
            </label>
            <textarea
              type="text"
              id="about"
              name="about"
              rows={5}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.about}
            />
            {formik.touched.about && formik.errors.about && (
              <p className="text-red-500 mt-1">{formik.errors.about}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 mt-1">{formik.errors.phone}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>
            <DatePicker
              id="dob"
              selected={formik.values.dob}
              onChange={(date) => formik.setFieldValue("dob", date)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-auto sm:text-sm"
              placeholderText="Select Date"
              dateFormat="MM/dd/yyyy" // Customize date format if needed
              isClearable // Add an option to clear the date
            />
            {formik.touched.dob && formik.errors.dob && (
              <p className="text-red-500 mt-1">{formik.errors.dob}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 my-4">
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              type="text"
              id="address"
              name="address"
              rows={5}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-red-500 mt-1">{formik.errors.address}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
            {formik.touched.city && formik.errors.city && (
              <p className="text-red-500 mt-1">{formik.errors.city}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.state}
            />
            {formik.touched.state && formik.errors.state && (
              <p className="text-red-500 mt-1">{formik.errors.state}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.country}
            />
            {formik.touched.country && formik.errors.country && (
              <p className="text-red-500 mt-1">{formik.errors.country}</p>
            )}
          </div>
        </div>

        {/* Add other fields and buttons */}
        <div className="flex items-center space-x-4 my-8">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300"
          >
            Update
          </button>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300"
            onClick={() => props.setIsEdit(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserProfileEditPage;
