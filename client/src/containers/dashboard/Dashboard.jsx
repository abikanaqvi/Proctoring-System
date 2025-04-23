import React, { useState, useEffect } from 'react';
import logo from './../../assets/finalogo.png';
import { CopyLink } from '../../components';
import './dashboard.css';

const Dashboard = () => {
  const [tests, setTests] = useState([]);

  // Fetch existing tests from the backend
  const fetchTests = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/tests'); // ✅ Use full URL
      const data = await response.json();
      setTests(data);
    } catch (error) {
      console.error('Error fetching tests:', error);
    }
  };

  // Call fetchTests on component mount
  useEffect(() => {
    fetchTests();
  }, []);

  // Update tests when a new test is created (optional if not used here)
  const handleTestCreate = (newTest) => {
    setTests((prevTests) => [...prevTests, newTest]);
  };

  return (
    <div className="section-type admin-dashboard">
      <div className="logo">
        <img src={logo} alt="HawkEye-logo" />
      </div>
      <h1 className="title-heading">Admin Dashboard</h1>

      <div className="test-dashboard">
        <h2 className="title-heading">Tests</h2>

        <div className="test-items">
          {tests.map((test) => (
            <div className="test-item" key={test._id}> {/* ✅ safer unique key */}
              <h4 className="test-time">{test.time || test.startDate}</h4>
              <h4 className="test-name">
                <a href="/status">{test.testName || test.name}</a>
              </h4>
              <CopyLink link={test.link || `http://localhost:3000/exam/${test._id}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
