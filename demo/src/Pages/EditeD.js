import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EditeD.css'; // Import your CSS file

const EditEmployee = () => {
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
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="edit-form">
      <h2>Edit Employee Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="details-box">
          <label className="field-label">
            Name:
            <input type="text" name="name" value={employeeData.name} onChange={handleChange} className="input-field" />
          </label>
          <label className="field-label">
            Phone:
            <input type="text" name="phone" value={employeeData.phone} onChange={handleChange} className="input-field" />
          </label>
          <label className="field-label">
            Email:
            <input type="text" name="email" value={employeeData.email} onChange={handleChange} className="input-field" />
          </label>
          <div className="field-group">
            <div className="field-item">
              <label className="field-label">
                Technology:
                <select name="technology" value={employeeData.technology} onChange={handleChange} className="select-field">
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Devops">Devops</option>
                  <option value="Full-Stack">Full-Stack</option>
                </select>
              </label>
            </div>
            <div className="field-item">
              <label className="field-label">
                Position:
                <select name="position" value={employeeData.position} onChange={handleChange} className="select-field">
                  <option value="Entry-Level">Entry-Level</option>
                  <option value="Mid-Level">Mid-Level</option>
                  <option value="Senior-Level">Senior-Level</option>
                  <option value="Executive-Level">Executive-Level</option>
                </select>
            
              </label>
            </div>
          </div>
          <button className="changes-button" type="submit">Save Changes</button>

        </div>
       
      </form>
    </div>
  );
};

export default EditEmployee;
