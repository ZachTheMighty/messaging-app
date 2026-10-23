import { useContext, useState, useEffect } from "react";
import { Context } from "./context.jsx";
import { SquarePen, Camera } from "lucide-react";
import Input from "./input.jsx";

export default function Profile() {
  const { loggedInUser, setLoggedInUser } = useContext(Context);
  const [formData, setFormData] = useState({
    firstName: loggedInUser.firstName,
    lastName: loggedInUser.lastName,
    photo: { path: loggedInUser.photo, file: "" },
  });

  useEffect(() => {
    fetch(formData.photo.path)
      .then((response) => response.blob())
      .then((file) =>
        setFormData({ ...formData, photo: { ...formData.photo, file } }),
      );
  }, []);

  const dataToSend = new FormData();

  dataToSend.append("firstName", formData.firstName);
  dataToSend.append("lastName", formData.lastName);
  dataToSend.append("file", formData.photo.file);

  const [errors, setErrors] = useState("s");

  const [editButton, setEditButton] = useState(true);

  const handleSubmit = async () => {
    if (editButton) return setEditButton((prevEditButton) => !prevEditButton);

    const response = await fetch(
      `https://message-api-264x.onrender.com/users/${loggedInUser.id}`,
      {
        method: "post",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: dataToSend,
      },
    );
    const data = await response.json();
    if (!response.ok)
      return setErrors({ errors: data.errors, status: response.status });
    setErrors(null);
    setLoggedInUser(data);
    setEditButton((prevEditButton) => !prevEditButton);
  };

  return (
    <div className="flex-1 p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-12 sm:gap-2">
        <div className="flex items-center gap-4 sm:gap-8">
          <div className="w-25 h-25 sm:w-50 sm:h-50 relative">
            <label htmlFor="file">
              <img
                src={formData.photo.path}
                className="h-full object-cover rounded-full"
              />
              {!editButton && (
                <>
                  <Camera className="absolute right-[10%] top-0 size-[20%]" />

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
                </>
              )}
            </label>
          </div>
          <div className="flex flex-col gap-1 sm:gap-4">
            <div className="font-bold text-xl sm:text-2xl">{`${loggedInUser.firstName} ${loggedInUser.lastName}`}</div>
            <div className="text-gray-500">{loggedInUser.email}</div>
          </div>
        </div>
        <div
          onClick={handleSubmit}
          className="bg-gray-100 hover:bg-gray-200 active:bg-gray-100 px-6 py-3 rounded-full flex items-center gap-2 font-medium text-sm sm:text-base"
        >
          <SquarePen size="15" />
          <button>{editButton ? "EDIT PROFILE" : "CONFIRM"}</button>
        </div>
      </div>
      <div className="mt-16 grid sm:grid-cols-2 gap-6">
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
              disabled={editButton}
            />
          );
        })}
      </div>
    </div>
  );
}
