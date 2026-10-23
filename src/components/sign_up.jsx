import Input from "./input.jsx";
import { useEffect, useState } from "react";
import Link from "./link.jsx";
import defaultProfile from "../assets/default_profile.jpg";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    photo: { path: defaultProfile, file: "" },
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState("s");

  useEffect(() => {
    fetch(defaultProfile)
      .then((response) => response.blob())
      .then((file) =>
        setFormData({ ...formData, photo: { ...formData.photo, file } }),
      );
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataToSend = new FormData();

    dataToSend.append("firstName", formData.firstName);
    dataToSend.append("lastName", formData.lastName);
    dataToSend.append("email", formData.email);
    dataToSend.append("password", formData.password);
    dataToSend.append("confirmPassword", formData.confirmPassword);

    dataToSend.append("file", formData.photo.file);

    const response = await fetch("https://message-api-264x.onrender.com/users", {
      method: "post",
      body: dataToSend,
    });

    const data = await response.json();
    if (!response.ok)
      return setErrors({ errors: data.errors, status: response.status });
    setErrors(null);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f5f9fa]">
      <div className="w-full sm:w-150 [#fff] px-4 sm:px-16 py-8 rounded-md shadow-[0px_0px_20px_2px_rgba(0,0,0,0.1)]">
        <div className="text-purple-900 font-bold text-3xl text-center my-8">
          Sign Up
        </div>
        <form
          onSubmit={(event) => handleSubmit(event)}
          encType="multipart/form-data"
        >
          {Object.entries(formData).map((input, index) => {
            if (input[0] === "photo") return;
            return (
              <Input
                key={index}
                text={input[0]}
                type={input[0].includes("word") ? "password" : "text"}
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />
            );
          })}
          <div className="mt-8">
            <label htmlFor="file">
              <div className="mt-4 flex justify-center">
                <img
                  src={formData.photo.path}
                  className="w-25 h-25 sm:w-50 sm:h-50 object-cover rounded-full"
                />
              </div>
            </label>

            <input
              type="file"
              id="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                setFormData({
                  ...formData,
                  photo: {
                    path: URL.createObjectURL(event.target.files[0]),
                    file: event.target.files[0],
                  },
                });
              }}
            />
          </div>
          <button className="bg-purple-900 text-white w-full py-3 rounded-md font-bold text-lg hover:bg-purple-700 active:bg-purple-900 mb-4 mt-8">
            Sign Up
          </button>
          {errors?.status === 409 ? (
            <div>
              {errors.errors} Would you like to <Link to="/">Sign in</Link>
              instead?
            </div>
          ) : !errors ? (
            <div>
              Successfully created account. <Link to="/">Sign in</Link>
            </div>
          ) : (
            <div className="text-center">
              Already have an account? <Link to="/">Sign in</Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
