import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// Dashboard
import Dashboard from "./pages/Dashboard";

// Departments
import DepartmentList from "./pages/Departments/DepartmentList";
import AddDepartment from "./pages/Departments/AddDepartment";
import ViewDepartment from "./pages/Departments/ViewDepartment";
import EditDepartment from "./pages/Departments/EditDepartment"; // ✅ NEW

// Employees
import EmployeeList from "./pages/Employee/EmployeeList";
import AddEmployee from "./pages/Employee/AddEmployee";
import ViewEmployee from "./pages/Employee/ViewEmployee";
import EditEmployee from "./pages/Employee/EditEmployee";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* Department Routes */}
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/departments/add" element={<AddDepartment />} />
          <Route path="/departments/:id" element={<ViewDepartment />} />
          <Route path="/departments/edit/:id" element={<EditDepartment />} />

          {/* Employee Routes */}
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/employees/edit/:id" element={<EditEmployee />} />
          <Route path="/employees/:id" element={<ViewEmployee />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
