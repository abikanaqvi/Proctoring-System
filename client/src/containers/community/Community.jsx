import React, { useState } from 'react';
import "./community.css";

const Community = () => {
  // State for discussion forum posts
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  // Handle new post submission
  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (author && content) {
      const newPost = { id: Date.now(), author, content };
      setPosts([newPost, ...posts]);
      setAuthor("");
      setContent("");
    }
  };

  // Toggle FAQ answers
  const toggleFAQ = (index) => {
    document.getElementById(`faq-answer-${index}`).classList.toggle("show");
  };

  return (
    <div className="community-container">
      <h1 className="community-title">Welcome to the Community Page</h1>
      
      {/* Discussion Forum */}
      <section className="discussion-forum">
        <h2>Discussion Forum</h2>
        <form onSubmit={handlePostSubmit} className="post-form">
          <input type="text" placeholder="Your Name" value={author} onChange={(e) => setAuthor(e.target.value)} required />
          <textarea placeholder="Share your thoughts..." value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
          <button type="submit">Post</button>
        </form>
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post.id} className="post-item">
              <h4>{post.author}</h4>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {["How does the proctoring work?", "What are the system requirements?", "Is my data secure?"].map((question, index) => (
            <div key={index} className="faq-item" onClick={() => toggleFAQ(index)}>
              <div className="faq-question">{question}</div>
              <div className="faq-answer" id={`faq-answer-${index}`}>Answer for {question}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>User Testimonials</h2>
        <div className="testimonial">"This platform is amazing!" - John Doe</div>
        <div className="testimonial">"I love using HawkEye for exams!" - Jane Smith</div>
      </section>

      {/* Support Section */}
      <section className="support">
        <h2>Support & Help Desk</h2>
        <ul>
          <li><a href="#">Live Chat</a></li>
          <li><a href="#">Email Support</a></li>
          <li><a href="#">Help Articles</a></li>
        </ul>
      </section>

      {/* Leaderboard */}
      <section className="leaderboard">
        <h2>Community Leaderboard</h2>
        <table>
          <thead>
            <tr><th>User</th><th>Posts</th><th>Upvotes</th></tr>
          </thead>
          <tbody>
            <tr><td>JohnDoe</td><td>15</td><td>45</td></tr>
            <tr><td>JaneSmith</td><td>12</td><td>38</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Community;
