import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header'; 
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import DepartmentList from './components/DepartmentList';
import DepartmentForm from './components/DepartmentForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
      <Header />
      <div className="main-content"> 
      <Sidebar className="sidebar" /> 
        <main className="content">
          <Routes>
            <Route path="/" element={<StudentList />} />
            <Route path="/students/new" element={<StudentForm />} />
            <Route path="/students/edit/:id" element={<StudentForm />} />
            <Route path="/departments" element={<DepartmentList />} />
            <Route path="/departments/new" element={<DepartmentForm />} />
            <Route path="/departments/edit/:id" element={<DepartmentForm />} />
          </Routes>
        </main>
      </div>
      </div>
    </Router>
  );
}

export default App;