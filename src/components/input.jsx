import { Eye, EyeOff } from "lucide-react";
import deCamel from "../utils/de_camel.js";
import { useState } from "react";

export default function Input({ text, type, formData, setFormData, errors }) {
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
        value={formData[text]}
        onChange={(event) =>
          setFormData({ ...formData, [text]: event.target.value })
        }
        className="outline outline-black/10 p-4 hover:outline-teal-500 rounded-md focus:outline-2 focus:outline-teal-500"
      />
      {errors !== "s" && (
        <ul className="list-disc mt-3">
          {errors?.status === 422 &&
            errors.errors.map((error, index) => {
              if (error.path === text)
                return (
                  <li key={index} className="text-red-500 font-bold text-xs">
                    {error.msg}
                  </li>
                );
            })}
        </ul>
      )}
    </div>
  );
}
