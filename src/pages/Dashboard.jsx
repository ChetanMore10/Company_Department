import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, Building2 } from "lucide-react";
import { getAllDepartments } from "../api/departmentService";
import { getAllEmployees } from "../api/employeeService"; // create if not exists

const Dashboard = () => {
  const [departmentCount, setDepartmentCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const deptRes = await getAllDepartments();
        const empRes = await getAllEmployees();
        setDepartmentCount(deptRes.length);
        setEmployeeCount(empRes.length);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h2>

      {/* Stats / Quick Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className="text-gray-500">Total Departments</p>
            <h3 className="text-3xl font-bold text-gray-800">
              {departmentCount}
            </h3>
          </div>
          <Building2 className="text-blue-600" size={45} />
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className="text-gray-500">Total Employees</p>
            <h3 className="text-3xl font-bold text-gray-800">
              {employeeCount}
            </h3>
          </div>
          <Users className="text-green-600" size={45} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/departments/add"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-10 flex items-center justify-center shadow-md"
        >
          <p className="text-xl font-semibold">+ Add Department</p>
        </Link>

        <Link
          to="/employees/add"
          className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-10 flex items-center justify-center shadow-md"
        >
          <p className="text-xl font-semibold">+ Add Employee</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
