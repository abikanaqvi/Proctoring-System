import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 import useNavigate
import logo from './../../assets/finalogo.png';
import { CommonInput, CtaButton } from '../../components';
import './create.css';

const inputFields = [
  { label: 'Email ID', name: 'email' },
  { label: 'Organization Name', name: 'organizationName' },
  { label: 'Test Name', name: 'testName' },
  { label: 'Question Paper Link', name: 'questionPaperLink' },
  { label: 'Total Expected Candidates', name: 'expectedCandidates' },
  { label: 'Start Date-Time Format (YYYY-MM-DDTHH:MM)', name: 'startDate' },
  { label: 'Duration (in minutes)', name: 'duration' },
];

const Create = ({ onTestCreate }) => {
  const [formData, setFormData] = useState({
    email: '',
    organizationName: '',
    testName: '',
    questionPaperLink: '',
    expectedCandidates: '',
    startDate: '',
    duration: '',
  });

  const navigate = useNavigate(); // 👈 initialize navigate

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: formData.email,
      organizationName: formData.organizationName,
      testName: formData.testName,
      questionPaperLink: formData.questionPaperLink,
      expectedCandidates: Number(formData.expectedCandidates),
      duration: Number(formData.duration),
      startDate: new Date(formData.startDate).toISOString(),
    };

    try {
      const response = await fetch('http://localhost:8000/api/tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server error: ${text}`);
      }

      const newTest = await response.json();
      onTestCreate?.(newTest);

      // Reset form
      setFormData({
        email: '',
        organizationName: '',
        testName: '',
        questionPaperLink: '',
        expectedCandidates: '',
        startDate: '',
        duration: '',
      });

      // 👇 redirect to dashboard after success
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating test:', error.message || error);
    }
  };

  return (
    <div className="client-create">
      <div className="logo">
        <img src={logo} alt="HawkEye-logo" />
      </div>
      <div className="create-form">
        <h1 className="title-heading">Create a test</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-fields">
            {inputFields.map(({ label, name }, index) => (
              <CommonInput
                key={index}
                placeholderText={label}
                value={formData[name]}
                onChange={(e) => handleChange(e, name)}
              />
            ))}
          </div>
          <CtaButton text="Create" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Create;
