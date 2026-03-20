import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import Table from "../../components/Table";
import { getAllDepartments, deleteDepartment } from "../../api/departmentService";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);

  const loadDepartments = async () => {
    try {
      const data = await getAllDepartments();
      setDepartments(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this department?")) {
      deleteDepartment(id)
        .then(() => loadDepartments())
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Departments</h2>

        <Link
          to="/departments/add"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Add Department
        </Link>
      </div>

      {/* Search (UI only for now) */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Department..."
          className="border px-3 py-2 rounded-lg w-64 focus:ring focus:ring-blue-200 outline-none"
        />
      </div>

      {/* Reusable Table Component */}
      <Table
        columns={["ID", "Department Name", "Location"]}
        data={departments.map((dept) => ({
          id: dept.id,
          name: dept.name,
          location: dept.location || "-",
        }))}
        renderActions={(dept) => (
          <div className="flex justify-center gap-3">
            {/* View */}
            <Link to={`/departments/${dept.id}`}>
              <Eye className="text-blue-600 hover:text-blue-800 cursor-pointer" />
            </Link>

            {/* Edit */}
            <Link to={`/departments/edit/${dept.id}`}>
              <Edit className="text-green-600 hover:text-green-800 cursor-pointer" />
            </Link>

            {/* Delete */}
            <Trash2
              className="text-red-600 hover:text-red-800 cursor-pointer"
              onClick={() => handleDelete(dept.id)}
            />
          </div>
        )}
      />
    </>
  );
};

export default DepartmentList;
