import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    cars: [],  // Add cars array to match backend structure if applicable
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function changeHandler(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      // Check if passwords match
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      
      // Remove confirmPassword before sending to backend
      const { confirmPassword, ...accountData } = formData;
      console.log(accountData);
      // Send signup request to backend
      const response = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accountData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        toast.success("Account created successfully");
        navigate("/login");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Error in registration", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="">
      <form onSubmit={submitHandler}>
        <label className="w-full">
          <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
            Username <sup className="text-pink-600">*</sup>
          </p>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={changeHandler}
            placeholder="Enter your username"
            className="bg-gray-600 rounded-[0.5rem] text-white w-full p-[12px]"
          />
        </label>

        <label className="w-full mt-4">
          <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
            Email Address<sup className="text-pink-600">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Enter your email"
            className="bg-gray-600 rounded-[0.5rem] text-white w-full p-[12px]"
          />
        </label>

        <div className="flex gap-4 mt-4">
          <label className="w-full relative">
            <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
              Create Password<sup className="text-pink-600">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={changeHandler}
              placeholder="Enter password"
              className="bg-gray-600 rounded-[0.5rem] text-white w-full p-[12px]"
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible size={24} fill="#AFB2BF" /> : <AiOutlineEye size={24} fill="#AFB2BF" />}
            </span>
          </label>

          <label className="w-full relative">
            <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
              Confirm Password<sup className="text-pink-600">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={changeHandler}
              placeholder="Confirm your password"
              className="bg-gray-600 rounded-[0.5rem] text-white w-full p-[12px]"
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible size={24} fill="#AFB2BF" /> : <AiOutlineEye size={24} fill="#AFB2BF" />}
            </span>
          </label>
        </div>

        <button className="bg-yellow-500 w-full rounded-[8px] font-medium text-black px-[12px] py-[8px] mt-10">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
