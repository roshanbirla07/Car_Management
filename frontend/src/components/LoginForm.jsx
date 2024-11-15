// LoginForm.js (Frontend)

import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

const LoginForm = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [accountData, setAccountData] = useState({
        username: "",  // Changed from userName to username
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    function changeHandler(e) {
        setAccountData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const submitHandler = async (e) => {
        try {
            e.preventDefault();

            // Log account data for debugging
            console.log("Account Data: ", accountData);

            const response = await fetch("http://localhost:3000/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(accountData),
                credentials: 'include', // Include cookies (authToken) in requests
            });

            const responseData = await response.json();

            // Log the response data for debugging
            console.log("Response Data: ", responseData);

            if (response.ok) {
                // Store user data in cookies if needed (but not the authToken)
                Cookies.set("user", JSON.stringify(responseData.user), { expires: 1 });

                setIsLoggedIn(true);
                toast.success("Logged In Successfully!");
                navigate("/dashboard");
            } else {
                toast.error(responseData.message || "An error occurred during login.");
            }
        } catch (error) {
            console.log("Error in login", error);
            toast.error("An error occurred while logging in.");
        }
    };

    return (
        <form onSubmit={submitHandler} className="flex flex-col w-full gap-y-4 mt-6">
            <label className="w-full">
                <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
                    User Name<sup className=" text-pink-600">*</sup>
                </p>
                <input
                    required
                    type="text"
                    name="username"  // Changed to 'username' to match backend
                    value={accountData.username}
                    onChange={changeHandler}
                    placeholder="Enter your email id"
                    className=" bg-gray-600 rounded-[0.5rem] text-white w-full p-[12px]"
                />
            </label>

            <label className="w-full relative">
                <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
                    Password <sup className=" text-pink-600">*</sup>
                </p>
                <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={accountData.password}
                    onChange={changeHandler}
                    placeholder="Enter password"
                    className=" bg-gray-600 rounded-[0.5rem] text-white w-full p-[12px]"
                />
                <span
                    className="absolute right-3 top-[38px] cursor-pointer"
                    onClick={() => {
                        setShowPassword(!showPassword);
                    }}
                >
                    {showPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                </span>
                <Link to="/">
                    <p className="text-xs mt-1 text-blue-300 max-w-max ml-auto">
                        Forget Password
                    </p>
                </Link>
            </label>

            <div>
                <button className="bg-yellow-500 w-full rounded-[8px] font-medium text-black px-[12px] py-[8px] mt-5">
                    Sign In
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
