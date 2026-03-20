import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById, updateEmployee } from "../../api/employeeService";
import { getAllDepartments } from "../../api/departmentService";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    fName: "",
    lName: "",
    email: "",
    position: "",
    address: "",
    departmentId: "",
  });
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        const [emp, depts] = await Promise.all([
          getEmployeeById(id),
          getAllDepartments(),
        ]);

        setEmployee({
          fName: emp.fName || "",
          lName: emp.lName || "",
          email: emp.email || "",
          position: emp.position || "",
          address: emp.address || "",
          departmentId: emp.department?.id || emp.departmentId || "",
        });

        setDepartments(depts || []);
      } catch (err) {
        console.error("Error loading employee:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!employee.fName.trim()) newErrors.fName = "First name is required";
    if (!employee.lName.trim()) newErrors.lName = "Last name is required";
    if (!employee.email.trim()) newErrors.email = "Email is required";
    if (!employee.departmentId) newErrors.departmentId = "Select a department";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      fName: employee.fName,
      lName: employee.lName,
      email: employee.email,
      position: employee.position,
      address: employee.address,
      department: { id: Number(employee.departmentId) },
    };

    try {
      await updateEmployee(id, payload);
      alert("Employee updated");
      navigate("/employees");
    } catch (err) {
      console.error("Error updating employee:", err);
      alert("Failed to update employee");
    }
  };

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;

  return (
    <div>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Edit Employee</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-gray-700 font-medium mb-1 block">First name</label>
              <input
                type="text"
                className={`border px-3 py-2 rounded-lg w-full outline-none focus:ring ${
                  errors.fName ? "border-red-500" : "border-gray-300"
                }`}
                value={employee.fName}
                onChange={(e) => setEmployee({ ...employee, fName: e.target.value })}
              />
              {errors.fName && <p className="text-red-600 text-sm mt-1">{errors.fName}</p>}
            </div>

            <div>
              <label className="text-gray-700 font-medium mb-1 block">Last name</label>
              <input
                type="text"
                className={`border px-3 py-2 rounded-lg w-full outline-none focus:ring ${
                  errors.lName ? "border-red-500" : "border-gray-300"
                }`}
                value={employee.lName}
                onChange={(e) => setEmployee({ ...employee, lName: e.target.value })}
              />
              {errors.lName && <p className="text-red-600 text-sm mt-1">{errors.lName}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-gray-700 font-medium mb-1 block">Email</label>
            <input
              type="email"
              className={`border px-3 py-2 rounded-lg w-full outline-none focus:ring ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              value={employee.email}
              onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="text-gray-700 font-medium mb-1 block">Position</label>
            <input
              type="text"
              className="border px-3 py-2 rounded-lg w-full outline-none focus:ring border-gray-300"
              value={employee.position}
              onChange={(e) => setEmployee({ ...employee, position: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 font-medium mb-1 block">Address</label>
            <textarea
              className="border px-3 py-2 rounded-lg w-full outline-none focus:ring border-gray-300"
              value={employee.address}
              onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
            />
          </div>

          <div className="mb-6">
            <label className="text-gray-700 font-medium mb-1 block">Department</label>
            <select
              className={`border px-3 py-2 rounded-lg w-full outline-none focus:ring ${
                errors.departmentId ? "border-red-500" : "border-gray-300"
              }`}
              value={employee.departmentId}
              onChange={(e) => setEmployee({ ...employee, departmentId: e.target.value })}
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            {errors.departmentId && <p className="text-red-600 text-sm mt-1">{errors.departmentId}</p>}
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg" onClick={() => navigate('/employees')}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
