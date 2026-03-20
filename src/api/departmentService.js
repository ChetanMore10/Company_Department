import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9090/api";
// Department and Employee APIs may run on the same backend (9091) in your setup.
const DEPARTMENT_BASE = import.meta.env.VITE_DEPARTMENT_API_BASE_URL || "http://localhost:9091/api";
const EMPLOYEE_BASE = import.meta.env.VITE_EMPLOYEE_API_BASE_URL || "http://localhost:9091/api";
const DEPARTMENTS_URL = `${DEPARTMENT_BASE}/departments`;
const EMPLOYEES_URL = `${EMPLOYEE_BASE}/employees`;

export const getAllDepartments = async (params = {}) => {
  const response = await axios.get(DEPARTMENTS_URL, { params });
  return response.data;
};

export const getDepartmentById = async (id) => {
  try {
    const deptResponse = await axios.get(`${DEPARTMENTS_URL}/${id}`);
    const dept = deptResponse.data;

    // Try to fetch employees for the department. If employees endpoint fails, return dept without employees.
    try {
      const empRes = await axios.get(EMPLOYEES_URL, { params: { "department.id": id, departmentId: id } });
      return {
        ...dept,
        employees: empRes.data,
      };
    } catch (empErr) {
      console.warn("Failed to load employees for department", id, empErr.message || empErr);
      return dept;
    }
  } catch (err) {
    // If department not found (404), return null so UI can show 'not found'
    if (err?.response?.status === 404) return null;
    throw err;
  }
};

export const deleteDepartment = async (id) => {
  const response = await axios.delete(`${DEPARTMENTS_URL}/${id}`);
  return response.data;
};

export const addDepartment = async (dept) => {
  const response = await axios.post(DEPARTMENTS_URL, dept);
  return response.data;
};

export const updateDepartment = async (id, updatedDept) => {
  const response = await axios.put(`${DEPARTMENTS_URL}/${id}`, updatedDept);
  return response.data;
};
