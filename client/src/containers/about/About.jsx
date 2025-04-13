import React from 'react';
import './about.css';

const About = () => {
  return (
    <div className="about-container">
      {/* Introduction Section */}
      <section className="intro">
        <h1>About Our Proctoring System</h1>
        <p>
          Our AI-powered online exam proctoring system ensures secure and fair digital assessments.
          With advanced facial recognition, behavior analysis, and automated monitoring, we help maintain
          the integrity of online exams while providing a seamless experience for students and educators.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          Our mission is to create a trustworthy and accessible online examination platform. We strive to
          prevent cheating, enhance remote learning credibility, and provide a fair environment for all test-takers.
        </p>
      </section>

      {/* Meet the Team Section */}
      <section className="team">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="member">
          <img src="/images/abika-pic.png" alt="Abika Naqvi" />
              <h3>Abika Naqvi</h3>
           
          </div>
          <div className="member">
            <img src="/about/member2.jpg" alt="Team Member 2" />
            <h3>Sahrish Hasan</h3>
            
          </div>
          <div className="member">
            <img src="/images/member3.jpg" alt="Team Member 3" />
            <h3>Mili Tandon</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;