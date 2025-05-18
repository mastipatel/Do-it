import React from "react";
import SignInForm from "../../../components/auth/SignInForm";
const SignInPage = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="w-screen bg-gray-100 flex items-center justify-center p-10 overflow-x-hidden shadow">
        <SignInForm />
      </div>
    </>
  );
};

export default SignInPage;
