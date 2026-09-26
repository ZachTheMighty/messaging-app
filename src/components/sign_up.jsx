import Input from "./input.jsx";
import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState("s");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:8080/users", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok)
      return setErrors({ errors: data.errors, status: response.status });
    setErrors(null);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f5f9fa]">
      <div className="w-150 [#fff] px-16 py-8 rounded-md shadow-[0px_17px_20px_0px_rgba(0,0,0,0.1)]">
        <div className="text-purple-900 font-bold text-3xl text-center my-8">
          Sign Up
        </div>
        <form onSubmit={(event) => handleSubmit(event)}>
          <Input
            text="firstName"
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
          <Input
            text="lastName"
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
          <Input
            text="email"
            type="email"
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
          <Input
            text="password"
            type="password"
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
          <Input
            text="confirmPassword"
            type="password"
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
          <button className="bg-purple-900 text-white w-full py-3 rounded-md font-bold text-lg hover:bg-purple-700 active:bg-purple-900 mb-4">
            Sign Up
          </button>
          {errors?.status === 409 ? (
            <div>
              {errors.errors} Would you like to{" "}
              <span className="text-teal-500">Log in </span>
              instead?
            </div>
          ) : !errors ? (
            <div>
              Successfully created account.{" "}
              <span className="text-teal-500">Log in</span>
            </div>
          ) : (
            <div className="text-center">
              Already have an account?{" "}
              <span className="text-teal-500">Log in</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
