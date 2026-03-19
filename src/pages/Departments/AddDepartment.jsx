import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import { addDepartment } from "../../api/departmentService"; // ✅ added import

const AddDepartment = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Department name is required!");
      return;
    }

    // ✅ Call temporary API
    addDepartment({ name })
      .then(() => {
        alert("✅ Department added (temporary API)");
        setName(""); // clear field
        setError("");
        navigate("/departments"); // redirect to list
      })
      .catch((err) => {
        console.error("Error adding department:", err);
        alert("⚠️ Failed to add department. Try again.");
      });
  };

  return (
    <div>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Add Department
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Department Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">
              Department Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Department Name"
              className={`border px-3 py-2 rounded-lg w-full focus:ring outline-none ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
            />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/departments")}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
