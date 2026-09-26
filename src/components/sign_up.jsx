import Input from "./input.jsx";

export default function SignUp() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f5f9fa]">
      <div className="w-150 [#fff] px-16 py-4 rounded-md shadow-[0px_17px_20px_0px_rgba(0,0,0,0.1)]">
        <div className="text-purple-900 font-bold text-3xl text-center my-8">
          Sign Up
        </div>
        <form>
          <Input text="firstName" />
          <Input text="lastName" />
          <Input text="email" type="email" />
          <Input text="password" type="password" />
          <Input text="confirmPassword" type="password" />
          <button className="bg-purple-900 text-white w-full py-3 rounded-md font-bold text-lg hover:bg-purple-700 active:bg-purple-900">
            Sign Up
          </button>
          <div className="text-center mb-8 mt-4">
            Already have an account?
            <span className="text-teal-500"> Log in</span>
          </div>
        </form>
      </div>
    </div>
  );
}
