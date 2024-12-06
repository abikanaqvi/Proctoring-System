import React from 'react';
import './commoninput.css';

const CommonInput = ({ placeholderText = 'Input', value, onChange, name }) => {
	return (
		<input
			type="text"
			placeholder={placeholderText}
			value={value}
			onChange={onChange}
			name={name}
		/>
	);
};

export default CommonInput;
