import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { Pencil, Trash2, Plus } from "lucide-react";
import { getDepartmentById } from "../../api/departmentService";

const ViewDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const data = await getDepartmentById(id);

        // Assuming backend response includes employees list
        setDepartment(data);
        setEmployees(data.employees || []);
      } catch (error) {
        console.error("Error fetching department details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  if (loading) {
    return (
      <div>
        <div className="text-center py-10 text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!department) {
    return (
      <div>
        <div className="text-center py-10 text-gray-500">
          Department not found.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        {/* Department Info */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {department.name}
            </h2>

            <div className="flex gap-3">
              <Link
                to={`/departments/edit/${id}`}
                className="text-blue-600 hover:text-blue-800"
              >
                <Pencil size={20} />
              </Link>

              <button className="text-red-600 hover:text-red-800">
                <Trash2 size={20} />
              </button>
            </div>
          </div>

          <p className="text-gray-500 text-sm mt-2">
            Department ID: {department.id} • Location: {department.location || "-"}
          </p>
        </div>

        {/* Employees Table */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Employees</h3>

            <Link
              to={`/employees/add?dept=${id}`}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              <Plus size={18} /> Add Employee
            </Link>
          </div>

          {employees.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No employees found in this department.
            </p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Employee Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {employees.map((emp, index) => (
                  <tr key={emp.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 font-medium">
                      {emp.fName || emp.lName
                        ? `${emp.fName || ""} ${emp.lName || ""}`.trim()
                        : emp.name || "-"}
                    </td>
                    <td className="p-3">{emp.email || "-"}</td>
                    <td className="p-3 text-center">
                      <Link to={`/employees/${emp.id}`} className="text-blue-600 hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewDepartment;
