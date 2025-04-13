import React from 'react';
import './product.css';

const Product = () => {
  return (
    <div className="product-container">
      {/* Product Heading */}
      <section className="product-intro">
        <h1>Our Products</h1>
        <p>
          Explore our range of AI-powered proctoring and online examination solutions
          designed to ensure fair, secure, and seamless assessments.
        </p>
      </section>

      {/* Product Categories */}
      <section className="product-categories">
        <h2>Categories</h2>
        <ul>
          <li>Online Examination Solution</li>
          <li>Remote Proctoring Solution</li>
          <li>AI-Based Cheating Detection</li>
          <li>Secure Browser Integration</li>
          <li>Live & Recorded Proctoring</li>
        </ul>
      </section>

      {/* Key Features */}
      <section className="product-features">
        <h2>Key Features</h2>
        <p>✔️ AI-Based Face Recognition</p>
        <p>✔️ Browser Lockdown System</p>
        <p>✔️ Live Human Proctoring</p>
        <p>✔️ Automated Cheating Alerts</p>
        <p>✔️ Seamless Integration with LMS</p>
      </section>
    </div>
  );
};

export default Product;