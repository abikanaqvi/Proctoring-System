import React, { useState } from 'react';
import logo from './../../assets/logofont.svg';
import { CommonInput, CtaButton } from '../../components';
import './create.css';

const inputField = [
  'Email ID',
  'Organization Name',
  'Test Name',
  'Question Paper Link',
  'Total Expected Candidates',
  'Start Date-Time Format',
  'Duration'
];

const Create = () => {
  const [formData, setFormData] = useState({
    email: '',
    organizationName: '',
    testName: '',
    questionPaperLink: '',
    expectedCandidates: '',
    startDate: '',
    duration: ''
  });

  // Handle input changes
  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent default form behavior
    console.log('Form submitted with data:', formData);  // Log form data to console
    // Here, you would typically make an API request or other actions
  };

  return (
    <div className="client-create">
      <div className="logo">
        <img src={logo} alt="aankh-logo" />
      </div>
      <div className="create-form">
        <h1 className="title-heading">Create a test</h1>
        <form onSubmit={handleSubmit}>  {/* Form submit handler */}
          <div className="input-fields">
            {inputField.map((item, index) => (
              <CommonInput
                key={index}
                placeholderText={item}
                value={formData[item.toLowerCase().replace(/\s+/g, '')]}
                onChange={(e) => handleChange(e, item.toLowerCase().replace(/\s+/g, ''))}
              />
            ))}
          </div>
          <CtaButton text="Create" type="submit" />  {/* Type should be "submit" */}
        </form>
      </div>
    </div>
  );
};

export default Create;
