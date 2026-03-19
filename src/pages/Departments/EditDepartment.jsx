import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { getDepartmentById, updateDepartment } from "../../api/departmentService";

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch department details (temporary API)
  useEffect(() => {
    getDepartmentById(id)
      .then((res) => {
        // JSONPlaceholder returns post { title, body } instead of { name }
        setName(res.data.title || `Department ${id}`);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching department:", err);
        setLoading(false);
      });
  }, [id]);

  // ✅ Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    updateDepartment(id, { name })
      .then(() => {
        alert("Department updated (temporary API)");
        navigate("/departments");
      })
      .catch((err) => console.error("Error updating:", err));
  };

  if (loading) {
    return (
      <div>
        <div className="p-6 text-gray-600">Loading department details...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Edit Department
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Department Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-200 outline-none"
              placeholder="Enter department name"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Update Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDepartment;
