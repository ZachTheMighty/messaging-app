import { Eye, EyeOff } from "lucide-react";
import deCamel from "../utils/de_camel.js";
import { useState } from "react";

export default function Input({ text, type }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col mb-6 gap-1 relative">
      {type === "password" && !showPassword ? (
        <Eye
          onClick={() =>
            setShowPassword((prevShowPassword) => !prevShowPassword)
          }
          className="absolute right-5 top-11 text-black/30 hover:text-black active:text-black/30"
        />
      ) : type === "password" ? (
        <EyeOff
          onClick={() =>
            setShowPassword((prevShowPassword) => !prevShowPassword)
          }
          className="absolute right-5 top-11 text-black/30 hover:text-black active:text-black/30"
        />
      ) : (
        ""
      )}

      <label htmlFor={text}>{deCamel(text)}</label>
      <input
        type={type === "password" && !showPassword ? "password" : "text"}
        name={text}
        id={text}
        placeholder={deCamel(text)}
        className="outline outline-black/10 p-4 hover:outline-teal-500 rounded-md focus:outline-2 focus:outline-teal-500"
      />
    </div>
  );
}
