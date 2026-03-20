import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllDepartments } from "../../api/departmentService";
import { addEmployee } from "../../api/employeeService";

const AddEmployee = () => {
  const [searchParams] = useSearchParams();
  const selectedDeptId = searchParams.get("dept");

  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    fName: "",
    lName: "",
    email: "",
    position: "",
    address: "",
    departmentId: selectedDeptId || "",
  });

  const [errors, setErrors] = useState({});

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllDepartments();
        setDepartments(data);
      } catch (err) {
        console.error("Error loading departments:", err);
      }
    };

    load();
  }, []);

  const validate = () => {
    let newErrors = {};
    if (!employee.fName.trim()) newErrors.fName = "First name is required!";
    if (!employee.lName.trim()) newErrors.lName = "Last name is required!";
    if (!employee.email.trim()) newErrors.email = "Email is required!";
    if (!employee.departmentId)
      newErrors.departmentId = "Select a department!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = {
      fName: employee.fName,
      lName: employee.lName,
      position: employee.position,
      address: employee.address,
      email: employee.email,
      department: { id: Number(employee.departmentId) },
    };

    try {
      await addEmployee(payload);
      alert("Employee added");
      navigate("/employees");
    } catch (err) {
      console.error("Error adding employee:", err);
      alert("Failed to add employee. Check console for details.");
    }
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
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  className={`border px-3 py-2 rounded-lg w-full outline-none focus:ring ${
                    errors.fName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="First name"
                  value={employee.fName}
                  onChange={(e) => {
                    setEmployee({ ...employee, fName: e.target.value });
                    setErrors({ ...errors, fName: "" });
                  }}
                />
                {errors.fName && (
                  <p className="text-red-600 text-sm mt-1">{errors.fName}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  className={`border px-3 py-2 rounded-lg w-full outline-none focus:ring ${
                    errors.lName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Last name"
                  value={employee.lName}
                  onChange={(e) => {
                    setEmployee({ ...employee, lName: e.target.value });
                    setErrors({ ...errors, lName: "" });
                  }}
                />
                {errors.lName && (
                  <p className="text-red-600 text-sm mt-1">{errors.lName}</p>
                )}
              </div>
            </div>
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

          {/* Position */}
          <div className="mb-4">
            <label className="text-gray-700 font-medium mb-1 block">Position</label>
            <input
              type="text"
              className="border px-3 py-2 rounded-lg w-full outline-none focus:ring border-gray-300"
              placeholder="Enter position"
              value={employee.position}
              onChange={(e) => setEmployee({ ...employee, position: e.target.value })}
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="text-gray-700 font-medium mb-1 block">Address</label>
            <textarea
              className="border px-3 py-2 rounded-lg w-full outline-none focus:ring border-gray-300"
              placeholder="Enter address"
              value={employee.address}
              onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
            />
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
