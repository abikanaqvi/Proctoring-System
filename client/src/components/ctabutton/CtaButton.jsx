import React from 'react';
import './ctabutton.css';

const CtaButton = ({ text = 'Get Started', type = 'button', onClick }) => {
    return (
        <button className="ctabutton" type={type} onClick={onClick}>
            {text}
        </button>
    );
};

export default CtaButton;
