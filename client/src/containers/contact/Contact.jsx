/*import React from 'react';

const Contact = () => {
  return (
    <div>
      <h1>Contact Us Page</h1>
      <p>Get in touch with us!</p>
    </div>
  );
};

export default Contact;*/


import React from 'react';
import './contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      {/* Contact Heading */}
      <section className="contact-intro">
        <h1>Contact Us</h1>
        <p>
          Have any questions or need support? Feel free to reach out to us!
          Our team is always here to help and ensure a smooth experience.
        </p>
      </section>

      {/* Contact Details */}
      <section className="contact-details">
        <h2>Get in Touch</h2>
        <p>Email: support@proctoring.com</p>
        <p>Phone: +91 9473771250</p>
        <p>Address: Lucknow, India</p>
      </section>

      {/* Contact Form */}
      <section className="contact-form">
        <h2>Send Us a Message</h2>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default Contact;