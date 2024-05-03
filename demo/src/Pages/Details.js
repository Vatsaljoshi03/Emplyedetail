import React, { useEffect, useState } from 'react';
import useCalculate from '../Hooks/useCalculate';
import './Details.css'; 
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; 

const Details = () => {
  const [formData, setFormData] = useState([]);
  const calculateExperience = useCalculate();

  useEffect(() => {
    const localStorageData = localStorage.getItem('data');
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      setFormData(parsedData);
    }
  }, []);

  const handleDelete = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const newData = [...formData];
        newData.splice(index, 1);
        setFormData(newData);
        localStorage.setItem('data', JSON.stringify(newData));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };

  return (
    <div className="table-container">
      <h2>Employee Details</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Total Experience</th>
            <th>Technology</th>
            <th>Possition</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.id}</td>
              <td><Link to={`/profile/${data.id}`}><img style={{ width: '50px', height: '50px', borderRadius: '100px' }} src={data.imagePreview} alt='pic' /></Link></td>
              <td><Link to={`/profile/${data.id}`}>{data.name}</Link></td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
              <td>{calculateExperience(data.experiences[0].joiningDate, data.experiences[0].endDate)}</td>
              <td>{data.technology}</td>
              <td>{data.possition}</td>
              <td>
                <button onClick={() => handleDelete(index)} className="delete-button">Delete</button>
                <Link to={`/edited/${data.id}`}><button className="edit-button">Edit</button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Details;
