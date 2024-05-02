import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EditeD.css'; // Import your CSS file

const EditeD = () => {
  const { id } = useParams(); // Get the employee ID from URL parameter
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    const localStorageData = localStorage.getItem('data');
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      const employee = parsedData.find((employee) => employee.id === id);
      setEmployeeData(employee);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const localStorageData = JSON.parse(localStorage.getItem('data'));
    const updatedData = localStorageData.map((employee) => {
      if (employee.id === id) {
        return employeeData;
      }
      return employee;
    });
    localStorage.setItem('data', JSON.stringify(updatedData));
  };

  if (!employeeData) {
    return <div className="loading">Loading...</div>; // Apply loading class
  }

  // Render your edit form with pre-filled data
  return (
    <div className="edit-form">
      <h2>Edit Employee Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:<input type="text" name="name" value={employeeData.name} onChange={handleChange} />
          Phone:<input type="text" name="phone" value={employeeData.phone} onChange={handleChange} />
          Email:<input type="text" name="email" value={employeeData.email} onChange={handleChange} />
       
       
          Technology:
          <select name="technology" value={employeeData.technology} onChange={handleChange}>
          <input type="text" name="technology" value={employeeData.technology} onChange={handleChange} />
          
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Devops">Devops</option>
          <option value="Full-Stack">Full-Stack</option>
          </select>
          
      
        Position:
        <select name="possition" value={employeeData.possition} onChange={handleChange}>
       <input type="text" name="possition" value={employeeData.possition} onChange={handleChange}    />
          
          <option value="Entry-Level">Entry-Level</option>
          <option value="Mid-Level">Mid-Level</option>
          <option value="Senior-Level">Senior-Level</option>
          <option value="Executive-Level">Executive-Level</option>
        </select>
    </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditeD;
