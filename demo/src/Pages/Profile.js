import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css'; // Import your CSS file

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const localStorageData = localStorage.getItem('data');
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      const profile = parsedData.find((profile) => profile.id === id);
      setProfileData(profile);
    }
  }, [id]);

  return (
    <div className="profile-container">
      {profileData ? (
        <div className="profile-box">
          <h2 className="profile-heading">Employee Profile</h2>
          <div className="profile-details-container">
            <div className="profile-photo">
              <img style={{ width: '200px', height: '200px', borderRadius: '400px', marginLeft: '20px'  }} src={profileData.imagePreview} alt='pic' />
            </div>
            <div className="profile-info">
              <div className="profile-details">
                <div className="section-content">🆔 ID: {profileData.id}</div>
                <div className="section-content">👤 Name: {profileData.name}</div>
                <div className="section-content">📧 Email: {profileData.email}</div>
                <div className="section-content">📞 Phone: {profileData.phone}</div>
              </div>
            </div>
          </div>
          <div className="profile-maindetails-container">
            <div className="profile-maindetails">
              <h2 className="section-heading">Main Details</h2>
              <div className="section-content">🎂 Date of Birth: {profileData.dob}</div>
              <div className="section-content">🏠 Address: {profileData.address}</div>
              <div className="section-content">🌍 Country: {profileData.country}</div>
              <div className="section-content">🌆 State: {profileData.state}</div>
              <div className="section-content">🌇 City: {profileData.city}</div>
              <div className="section-content">📌 Pincode: {profileData.pincode}</div>
              <div className="section-content">💼 Company Name: {profileData.companyname}</div>
              <div className="section-content">🏢 Company Address: {profileData.companyAddress}</div>
              <div className="section-content">💻 Technology: {profileData.technology}</div>
            </div>
            <div className="profile-experience">
              <h2 className="section-heading">Experience</h2>
              <div className="section-content">🏢 Company Name: {profileData.experiences[0].companyName}</div>
              <div className="section-content">📅 Joining Date: {profileData.experiences[0].joiningDate}</div>
              <div className="section-content">🔚 End Date: {profileData.experiences[0].endDate}</div>
            </div>
          </div>
        </div>
      ) : (
        <p className="loading-text">Loading...</p>
      )}
    </div>
  );
};

export default Profile;
