import React, { useState } from 'react';
import "./blog.css";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const blogPosts = [
    { id: 1, title: "AI in Exam Proctoring", category: "Technology", author: "ABIKA NAQVI", date: "Feb 10, 2025", content: "AI is transforming online exam security..." },
    { id: 2, title: "Best Practices for Online Exams", category: "Education", author: "SAHRISH HASAN", date: "Feb 12, 2025", content: "Follow these steps to ensure a smooth exam process..." },
    { id: 3, title: "How to Prevent Cheating in Exams", category: "Security", author: "MILI TANDON", date: "Feb 15, 2025", content: "Using AI and strict monitoring reduces cheating..." },
    { id: 4, title: "How to Prevent Cheating in Exams", category: "Security", author: "KALPANA", date: "Feb 16, 2025", content: "Using AI and strict monitoring reduces cheating..." },
    { id: 5, title: "How to Prevent Cheating in Exams", category: "Security", author: "VHFDAN", date: "Feb 17, 2025", content: "Using AI and strict monitoring reduces cheating..." }
  ];

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="blog-container">
      <h1 className="blog-title">Our Blog</h1>

      <div className="proctoring-intro">
        <h2>The Future of Online Exam Proctoring: Ensuring Integrity in Digital Assessments</h2>
        <h4>Introduction</h4>
        <p>With the rise of online learning, digital assessments have become the norm. However, ensuring exam integrity remains a significant challenge...</p>
        <h4>Why Online Proctoring is Essential</h4>
        <p>1. <strong>Prevents Cheating</strong> – AI-powered proctoring detects suspicious behavior like multiple faces, background noises, and screen activities.</p>
        <p>2. <strong>Ensures Fairness</strong> – Every student is monitored under the same conditions, reducing unfair advantages.</p>
        <p>3. <strong>Convenience & Accessibility</strong> – Students can take exams from anywhere, saving time and resources.</p>
        <h4>How AI Enhances Proctoring</h4>
        <p>- <strong>Facial Recognition</strong> – Verifies student identity to prevent impersonation.</p>
        <p>- <strong>Eye Tracking & Behavior Analysis</strong> – Detects unusual movements or distractions.</p>
        <p>- <strong>Automated Flagging</strong> – AI identifies suspicious actions and alerts human proctors for review.</p>
        <h4>Addressing Privacy Concerns</h4>
        <p>- <strong>Data Encryption</strong> – Ensures all student data remains secure.</p>
        <p>- <strong>Limited Access</strong> – Only authorized personnel can review exam recordings.</p>
        <p>- <strong>Transparency</strong> – Students are informed about monitoring policies beforehand.</p>
        <h4>Conclusion</h4>
        <p>Online proctoring is shaping the future of digital assessments, making exams more secure and fair...</p>
      </div>

      <input 
        type="text" 
        placeholder="Search posts..." 
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div className="blog-list">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="blog-post">
              <h2>{post.title}</h2>
              <p className="meta">By {post.author} | {post.date} | <span className="category">{post.category}</span></p>
              <p>{post.content}</p>
              <button className="read-more">Read More</button>
            </div>
          ))
        ) : (
          <p>No matching posts found.</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
