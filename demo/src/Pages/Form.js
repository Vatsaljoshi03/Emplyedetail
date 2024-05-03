import React, { useState, useEffect, useContext } from 'react';
import './Form.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/Store';
import useCalculate from '../Hooks/useCalculate';


const Form = () => {
    //    const [formData, setFormData] = useState();
    //   const [id , setId] = useState();
    //   const [name, setName] = useState();
    //   const [email , setEmail] = useState();
    //   const [phone , setPhone] = useState();
    //   const [address , setAddress] = useState();
    //   const [dob , setDob] = useState();
    //   const [country, setCountry] = useState();
    //   const [state , setState] = useState();
    //   const [city , setCity] = useState();
    //   const [pincode , setPincode] = useState();
    //
    const calculateExperience = useCalculate();
    const { data } = useContext(UserContext);
    const [formData, setFormData] = useState({
        id: '',
        image: '', 
        name: '',
        email: '',
        phone: '',
        address: '',
        dob: '',
        country: '',
        state: '',
        city: '',
        pincode: '',
        companyname: '',
        companyAddress: '',
        technology: '',
        possition: '',
        experiences: [{ companyName: '', joiningDate: '', endDate: '' }]
    });

   

    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        validateForm();
    }, [formData]);

    useEffect(() => {
        generateRandomId();
    }, []);

    // const useCalculate = () => {
    //     const calculateExperience = (startDate, endDate) => {
    //       const start = new Date(startDate);
    //       const end = new Date(endDate);

    //       let years = end.getFullYear() - start.getFullYear();
    //       let months = end.getMonth() - start.getMonth();

    //       if (months < 0) {
    //         years--;
    //         months += 12;
    //       }

    //       return `${years}Y ${months}M`;
    //     };

    //     return calculateExperience;
    //   };







    const generateRandomId = () => {
        const randomId = Math.floor(1000 + Math.random() * 9000);
        setFormData({ ...formData, id: randomId.toString() });
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];

        setFormData({ ...formData, image: selectedImage });

        // Display image preview
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(selectedImage);
    };



    const handleAdd = (e, index) => {
        const { name, value } = e.target;
        const experiences = [...formData.experiences];
        experiences[index][name] = value;

        const totalExperience = calculateExperience(experiences[index].joiningDate, experiences[index].endDate);
        // const totalExperience = useCalculate(experiences[index].joiningDate, experiences[index].endDate);

        experiences[index].totalExperience = totalExperience;


        setFormData({ ...formData, experiences });
    };

    const addExperience = () => {
        setFormData({
            ...formData,
            experiences: [...formData.experiences, { companyName: '', joiningDate: '', endDate: '', totalExperience: '' }]
        });
    };

    const removeExperience = (index) => {
        const experiences = [...formData.experiences];
        experiences.splice(index, 1);
        setFormData({ ...formData, experiences });
    };




    const validateForm = () => {
        let errors = {};

        const nameRegex = /^[a-zA-Z\s]*$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;
        const pincodeRegex = /^\d{6}$/;
        const companynameRegex = /^[a-zA-Z\s]*$/;
        const dobRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

        // Name validation
        if (!formData.name.trim()) {

        } else if (!nameRegex.test(formData.name)) {
            errors.name = 'Only letters are allowed';
        }

        // Email validation
        if (!formData.email.trim()) {

        } else if (!emailRegex.test(formData.email)) {
            errors.email = 'Invalid email format';
        }

        // Phone validation
        if (!formData.phone.trim()) {

        } else if (!phoneRegex.test(formData.phone)) {
            errors.phone = 'Invalid phone number';
        }

        // Date of Birth validation
        if (!formData.dob.trim()) {

        } else if (!dobRegex.test(formData.dob)) {
            errors.dob = 'Invalid date format (YYYY-MM-DD)';
        }

        // Address validation
        if (!formData.address.trim()) {
            // errors.address = 'Address is required';
        }

        // Pincode validation
        if (!formData.pincode.trim()) {

        } else if (!pincodeRegex.test(formData.pincode)) {
            errors.pincode = 'Invalid Pincode';
        }

        // Company Name validation
        if (!formData.companyname.trim()) {

        } else if (!companynameRegex.test(formData.companyname)) {
            errors.companyname = 'Only letters are allowed';
        }

        // Company Address validation
        if (!formData.companyAddress.trim()) {
            // errors.companyAddress = 'Company Address is required';
        }

        // Experiences validation
        formData.experiences.forEach((experience, index) => {
            if (!experience.companyName.trim()) {
                errors[`companyName${index}`] = 'Company Name in Experience is required';
            }

            if (!experience.joiningDate.trim()) {
                errors[`joiningDate${index}`] = 'Joining Date is required';
            }

            if (!experience.endDate.trim()) {
                errors[`endDate${index}`] = 'End Date is required';
            }
        });

        setErrors(errors);
    };



    const handleSubmit = (e) => {
        e.preventDefault();
   
        if (Object.keys(errors).length === 0 && errors.constructor === Object) {
            
            const formDataWithImage = { ...formData, imagePreview };
            data.push(formDataWithImage);
            localStorage.setItem('data', JSON.stringify(data));
            console.log(formDataWithImage);
            navigate('/details');
        } else {
            
            alert('Please fill out all fields correctly before submitting.');
        }
    };



    // const FileInput = () =>{

    // }

    return (
        <div className="form-container">
            <h2>Employee Details Form</h2>
            <form onSubmit={handleSubmit} className="employee-form">
                <div className="form-field">
                    <label>Random ID (4 digits)</label>
                    <input
                        type="text"
                        name="id"
                        value={formData.id}
                        // disabled
                        onChange={handleChange}
                        readOnly
                    />
                </div>

                <div className="form-field">
                <label>Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {imagePreview && (
                    <div>
                        <h3>Image Preview</h3>
                        <img
                            src={imagePreview}
                            alt="Preview"
                            style={{ maxWidth: '200px', maxHeight: '200px' }}
                        />
                    </div>
                )}
            </div>


                <div className="form-field">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-field">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-field">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-field">
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                    />
                    {errors.dob && <span className="error-message">{errors.dob}</span>}
                </div>

                <div className="form-field">
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    {errors.address && <span className="error-message">{errors.address}</span>}
                </div>



                <div>
                <select name="country" value={formData.country} onChange={handleChange} className="form-select">
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="Israil">Israel</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="China">China</option>
                </select>
                {errors.country && <span className="error-message">{errors.country}</span>}
            
                <select name="state" value={formData.state} onChange={handleChange} className="form-select">
                    <option value="">Select State</option>
                    <option value="Gujrat">Gujarat</option>
                    <option value="Zion">Zion</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Yunnan">Yunnan</option>
                </select>
                {errors.state && <span className="error-message">{errors.state}</span>}
            
                <select name="city" value={formData.city} onChange={handleChange} className="form-select">
                    <option value="">Select City</option>
                    <option value="Surat">Surat</option>
                    <option value="Haifa">Haifa</option>
                    <option value="Lahor">Lahor</option>
                    <option value="Wuhan">Wuhan</option>
                </select>
                {errors.city && <span className="error-message">{errors.city}</span>}
            </div>

                <div className="form-field">
                    <label>Pincode</label>
                    <input
                        type="number"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                    />
                    {errors.pincode && <span className="error-message">{errors.pincode}</span>}
                </div>

                <div className="form-field">
                    <label>Company Name</label>
                    <input
                        type="text"
                        name="companyname"
                        value={formData.companyname}
                        onChange={handleChange}
                    />
                    {errors.companyname && <span className="error-message">{errors.companyname}</span>}
                </div>

                <div className="form-field">
                    <label>Company Address</label>
                    <input
                        type="text"
                        name="companyAddress"
                        value={formData.companyAddress}
                        onChange={handleChange}
                    />
                    {errors.companyAddress && <span className="error-message">{errors.companyAddress}</span>}
                </div>

                <div>
                <select name="technology" value={formData.technology} onChange={handleChange} className="form-select">
                    <option value="">Technology</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Devops">Devops</option>
                    <option value="Full-Stack">Full-Stack</option>
                </select>
                {errors.technology && <span className="error-message">{errors.technology}</span>}
            
                <select name="possition" value={formData.possition} onChange={handleChange} className="form-select">
                    <option value="">Position</option>
                    <option value="Entry-Level">Entry-Level</option>
                    <option value="Mid-Level">Mid-Level</option>
                    <option value="Senior-Level">Senior-Level</option>
                    <option value="Executive-Level">Executive-Level</option>
                </select>
                {errors.possition && <span className="error-message">{errors.possition}</span>}
            </div>
            




                <div>
                    <h3>Experience</h3>
                    {formData.experiences.map((experience, index) => (
                        <div key={index} className="form-field">
                            <label>Company Name</label>
                            <input
                                type="text"
                                name="companyName"
                                value={experience.companyName}
                                onChange={(e) => handleAdd(e, index)}
                            />
                            <label>Joining Date</label>
                            <input
                                type="date"
                                name="joiningDate"
                                value={experience.joiningDate}
                                onChange={(e) => handleAdd(e, index)}
                            />
                            <label>End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={experience.endDate}
                                onChange={(e) => handleAdd(e, index)}
                            />
                            <span>Total Experience: {experience.totalExperience}</span>
                            {index > 0 && <button type="button" className="remove-button" onClick={() => removeExperience(index)}>Remove</button>}
                        </div>
                    ))}
                 
                </div>

                <button type="button" className="submit-button" onClick={addExperience}>Add</button>

                <button type="submit" className="submit-button" >Submit</button>
            </form>
        </div>
    );
};


export default Form;





