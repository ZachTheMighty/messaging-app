import { useState } from "react";
import Input from "./input.jsx";
import { Link } from "react-router";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:8080/tokens", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok)
      return setErrors({
        errors: data.errors,
        path: data.path,
        status: response.status,
      });
    setErrors(null);
    localStorage.setItem("token", data.token);
  };

  const [errors, setErrors] = useState("s");
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f5f9fa]">
      <div className="w-full sm:w-150 [#fff] px-4 sm:px-16 py-8 rounded-md shadow-[0px_17px_20px_0px_rgba(0,0,0,0.1)]">
        <div className="text-purple-900 font-bold text-3xl text-center my-8">
          Login
        </div>
        <form onSubmit={(event) => handleSubmit(event)}>
          {Object.entries(formData).map((input, index) => (
            <Input
              key={index}
              text={input[0]}
              type={input[0].includes("word") ? "password" : "text"}
              formData={formData}
              setFormData={setFormData}
              errors={errors}
            />
          ))}
          <button className="bg-purple-900 text-white w-full py-3 rounded-md font-bold text-lg hover:bg-purple-700 active:bg-purple-900 mb-4">
            Login
          </button>
          <div className="text-sm text-center mt-2">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="text-teal-500 hover:text-teal-600 active:text-teal-500"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
