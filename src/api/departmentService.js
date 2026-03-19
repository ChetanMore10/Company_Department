import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts"; 
// Temporary API — replace later with your real backend

// ✅ GET all departments
export const getAllDepartments = async () => {
  const response = await axios.get(API_URL);
  return {
    data: response.data.slice(0, 10).map((item) => ({
      id: item.id,
      name: item.title, // mimic "department name"
    })),
  };
};

// ✅ GET single department by ID
export const getDepartmentById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return {
    id: response.data.id,
    name: response.data.title,
    employees: [
      // Dummy employee list for testing
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ],
  };
};

// ✅ DELETE department by ID
export const deleteDepartment = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return true;
};

// ✅ ADD department
export const addDepartment = async (dept) => {
  const response = await axios.post(API_URL, dept);
  return response.data;
};

// ✅ UPDATE department (added to fix error)
export const updateDepartment = async (id, updatedDept) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedDept);
  return response.data;
};
