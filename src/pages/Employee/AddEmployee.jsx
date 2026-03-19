import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useNavigate, useSearchParams } from "react-router-dom";

const AddEmployee = () => {
  const [searchParams] = useSearchParams();
  const selectedDeptId = searchParams.get("dept");

  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    departmentId: selectedDeptId || "",
  });

  const [errors, setErrors] = useState({});

  const departments = [
    { id: 1, name: "IT" },
    { id: 2, name: "HR" },
    { id: 3, name: "Finance" },
  ];

  const validate = () => {
    let newErrors = {};
    if (!employee.name.trim()) newErrors.name = "Employee name is required!";
    if (!employee.email.trim()) newErrors.email = "Email is required!";
    if (!employee.departmentId)
      newErrors.departmentId = "Select a department!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    console.log("Saved Employee:", employee);

    navigate("/employees");
  };

  return (
    <div>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Add Employee
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Employee Name */}
          <div className="mb-4">
            <label className="text-gray-700 font-medium mb-1 block">
              Employee Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              className={`border px-3 py-2 rounded-lg w-full outline-none focus:ring ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter name"
              value={employee.name}
              onChange={(e) => {
                setEmployee({ ...employee, name: e.target.value });
                setErrors({ ...errors, name: "" });
              }}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-gray-700 font-medium mb-1 block">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              className={`border px-3 py-2 rounded-lg w-full outline-none focus:ring ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter email"
              value={employee.email}
              onChange={(e) => {
                setEmployee({ ...employee, email: e.target.value });
                setErrors({ ...errors, email: "" });
              }}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Department Select */}
          <div className="mb-6">
            <label className="text-gray-700 font-medium mb-1 block">
              Department <span className="text-red-600">*</span>
            </label>
            <select
              className={`border px-3 py-2 rounded-lg w-full outline-none focus:ring ${
                errors.departmentId ? "border-red-500" : "border-gray-300"
              }`}
              value={employee.departmentId}
              onChange={(e) => {
                setEmployee({ ...employee, departmentId: e.target.value });
                setErrors({ ...errors, departmentId: "" });
              }}
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            {errors.departmentId && (
              <p className="text-red-600 text-sm mt-1">
                {errors.departmentId}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
              onClick={() => navigate("/employees")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
