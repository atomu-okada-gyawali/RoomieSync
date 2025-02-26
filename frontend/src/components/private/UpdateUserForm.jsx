import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";

function UpdateUserForm({ uufIsOpen, uufOnClose }) {
  console.log("UpdateUserForm rendering, uufIsOpen:", uufIsOpen);

  if (!uufIsOpen) return null;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const selectedFile = watch("photo"); // Watch the file input for live preview

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:4000/api/auth/init",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const userData = response.data.data.Users;
        console.log("Fetched user data:", userData);

        setUserId(userData.Id);
        setValue("name", userData.Name);
        setValue("contact", userData.Contact);
        setValue("email", userData.Email);
        setValue("address", userData.Address);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user details.");
      }
    };

    fetchUser();
  }, [setValue]);

  const onSubmit = async (data) => {
  // Input validation
  if (!data.name) {
    alert("Name is required");
    return;
  }
  if (!data.email) {
    alert("Email is required");
    return;
  }
  // Additional validation for react-hook-form
  if (!data.email.includes('@')) {
    alert("Email must be a valid email address");
    return;
  }
    if (!userId) {
      setError("User ID is missing.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("contact", data.contact);
    formData.append("email", data.email);
    formData.append("address", data.address);

    if (data.photo?.[0]) {
      formData.append("photo", data.photo[0]);
    }

    console.log("Submitting form data:", [...formData.entries()]);

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.put(
        `http://localhost:4000/api/users/${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      localStorage.setItem("token", response.data.token);
      if (response.status === 200) {
        alert("User updated successfully!");
      setSuccess(true);
      fetchUser(); // Refresh the user data
      }

    } catch (err) {
      setError(err.response?.data?.message || "Update failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-10 flex flex-col gap-6 bg-neutral-50 rounded-lg shadow-md max-w-md mx-auto"
    >
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded">{error}</div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 px-4 py-3 rounded">
          Update successful!
        </div>
      )}

      {/* Name */}
      <div className="flex flex-col p-4 border rounded-lg shadow-md">
        <label htmlFor="name" className="text-lg font-medium mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Name is required" })}
          className={`h-10 px-4 border rounded focus:outline-none focus:ring-2 mb-2 ${
            errors.name
              ? "border-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Contact */}
      <div className="flex flex-col">
        <label htmlFor="contact" className="text-lg font-medium">
          Contact:
        </label>
        <input
          type="text"
          id="contact"
          {...register("contact")}
          className="h-10 px-4 border rounded focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label htmlFor="email" className="text-lg font-medium">
          Email:
        </label>
        <input
          type="email"
          id="email"
          {...register("email", { required: "Email is required" })}
          className={`h-10 px-4 border rounded focus:outline-none focus:ring-2 ${
            errors.email
              ? "border-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Address */}
      <div className="flex flex-col">
        <label htmlFor="address" className="text-lg font-medium">
          Address:
        </label>
        <input
          type="text"
          id="address"
          {...register("address")}
          className="h-10 px-4 border rounded focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
        />
      </div>

      {/* Photo Upload */}
      <div className="flex flex-col">
        <label htmlFor="photo" className="text-lg font-medium">
          Photo:
        </label>
        <input
          type="file"
          id="photo"
          accept="image/*"
          {...register("photo")}
          className="h-10 px-4 border rounded focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
        />
        {selectedFile && selectedFile[0] && (
        <img
          src={URL.createObjectURL(selectedFile[0])}
          alt="Selected"
          className="mt-2 h-24 w-24 object-cover rounded border border-gray-300 mx-auto"

          />
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={uufOnClose}
            className="h-10 px-4 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600"
          >
            Close
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="h-10 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>

      </div>
    </form>
  );
}

export default UpdateUserForm;
