import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getEmployeeById } from "../../api/employeeService";

const ViewEmployee = () => {
  const { id } = useParams(); // Will be used later with backend -> id
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getEmployeeById(id);
        setEmployee(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
      >
        <ArrowLeft size={18} />
        Back to List
      </button>

      {/* Header */}
      <h3 className="text-xl font-bold text-gray-800 mb-6">Employee Details</h3>

      {/* Employee Details */}
      {loading ? (
        <div className="p-4">Loading...</div>
      ) : employee ? (
        <div className="grid grid-cols-2 gap-6">
          <div className="border p-4 rounded-lg shadow-sm bg-gray-50">
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-lg font-semibold">{`${employee.fName || ""} ${employee.lName || ""}`.trim()}</p>
          </div>

          <div className="border p-4 rounded-lg shadow-sm bg-gray-50">
            <p className="text-sm text-gray-500">Position</p>
            <p className="text-lg font-semibold">{employee.position || "-"}</p>
          </div>

          <div className="border p-4 rounded-lg shadow-sm bg-gray-50">
            <p className="text-sm text-gray-500">Department</p>
            <p className="text-lg font-semibold">{employee.department?.name || employee.department?.id || "-"}</p>
          </div>

          <div className="col-span-2 border p-4 rounded-lg shadow-sm bg-gray-50">
            <p className="text-sm text-gray-500">Address</p>
            <p className="text-lg font-semibold">{employee.address || "-"}</p>
          </div>
        </div>
      ) : (
        <div className="p-4 text-gray-600">Employee not found.</div>
      )}
    </div>
  );
};

export default ViewEmployee;
