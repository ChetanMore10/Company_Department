import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ViewEmployee = () => {
  const { id } = useParams(); // Will be used later with backend -> id
  const navigate = useNavigate();

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
      <div className="grid grid-cols-2 gap-6">
        <div className="border p-4 rounded-lg shadow-sm bg-gray-50">
          <p className="text-sm text-gray-500">Full Name</p>
          <p className="text-lg font-semibold">John Doe</p>
        </div>

        <div className="border p-4 rounded-lg shadow-sm bg-gray-50">
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-lg font-semibold">john.doe@example.com</p>
        </div>

        <div className="border p-4 rounded-lg shadow-sm bg-gray-50">
          <p className="text-sm text-gray-500">Phone</p>
          <p className="text-lg font-semibold">9876543210</p>
        </div>

        <div className="border p-4 rounded-lg shadow-sm bg-gray-50">
          <p className="text-sm text-gray-500">Department</p>
          <p className="text-lg font-semibold">IT</p>
        </div>

        <div className="col-span-2 border p-4 rounded-lg shadow-sm bg-gray-50">
          <p className="text-sm text-gray-500">Address</p>
          <p className="text-lg font-semibold">
            123, Shivaji Nagar, Pune, Maharashtra
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
