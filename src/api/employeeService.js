import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9090/api";
// Employee API may run on a separate port; default to 9091 as provided.
const EMPLOYEE_BASE = import.meta.env.VITE_EMPLOYEE_API_BASE_URL || "http://localhost:9091/api";
const EMPLOYEES_URL = `${EMPLOYEE_BASE}/employees`;

export const getAllEmployees = async (params = {}) => {
	const response = await axios.get(EMPLOYEES_URL, { params });
	return response.data;
};

export const getEmployeeById = async (id) => {
	const response = await axios.get(`${EMPLOYEES_URL}/${id}`);
	return response.data;
};

export const getEmployeesByDepartment = async (departmentId) => {
	// Try common query param names so backend can accept either
	const response = await axios.get(EMPLOYEES_URL, { params: { "department.id": departmentId, departmentId } });
	return response.data;
};

export const addEmployee = async (data) => {
	// Expected shape:
	// {
	//   fName: "",
	//   lName: "",
	//   position: "",
	//   address: "",
	//   department: { id: 1 }
	// }
	const payload = { ...data };
	// Normalize department field: allow `department` to be id or object
	if (payload.department && typeof payload.department !== "object") {
		payload.department = { id: payload.department };
	}
	if (payload.department && payload.department.id === undefined && payload.departmentId) {
		payload.department = { id: payload.departmentId };
		delete payload.departmentId;
	}

	const response = await axios.post(EMPLOYEES_URL, payload);
	return response.data;
};

export const updateEmployee = async (id, data) => {
	const payload = { ...data };
	if (payload.department && typeof payload.department !== "object") {
		payload.department = { id: payload.department };
	}
	if (payload.department && payload.department.id === undefined && payload.departmentId) {
		payload.department = { id: payload.departmentId };
		delete payload.departmentId;
	}

	const response = await axios.put(`${EMPLOYEES_URL}/${id}`, payload);
	return response.data;
};

export const deleteEmployee = async (id) => {
	const response = await axios.delete(`${EMPLOYEES_URL}/${id}`);
	return response.data;
};
