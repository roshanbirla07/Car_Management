import React from "react";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import {FcGoogle} from "react-icons/fc"
const Template = ({ formtype, setIsLoggedIn }) => {
  return (
    <div className="flex w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-0 justify-center">
      <div className=" w-11/12 max-w-[450px]">
        
        {formtype === "signup" ? (
          <SignupForm setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
        )}

        <div className="flex w-full items-center my-4 gap-x-2">
          <div className=" w-full h-[1px] bg-gray-600"></div>
          <p className=" text-gray-500">OR</p>
          <div className="w-full h-[1px] bg-gray-600"></div>
        </div>
        <div >
           
          <button className="w-full flex justify-center items-center rounded-[8px] font-medium text-white 
          border-gray-600 px-[8px] gap-x-2 mt-6">
          <FcGoogle/>
          <p>Sign in with Google</p>
          </button>
        </div>
      </div>

     
    </div>
  );
};

export default Template;
