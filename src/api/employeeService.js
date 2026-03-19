// src/api/employeeService.js
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users"; // Temporary API

// Get all employees
export const getAllEmployees = () => axios.get(API_URL);

// Get employee by ID
export const getEmployeeById = (id) => axios.get(`${API_URL}/${id}`);

// Add new employee
export const addEmployee = (data) => axios.post(API_URL, data);

// Update employee
export const updateEmployee = (id, data) => axios.put(`${API_URL}/${id}`, data);

// Delete employee
export const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);
