import { useState } from 'react';

/* eslint-disable react/prop-types */
export function ButtonSecundary(props) {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyles = {
    padding: '.7rem 1rem',
    borderRadius: '0.5rem',
    border: "1px solid #0033A1",
    color: '#0033A1',
    cursor: 'pointer',
    fontSize: '1rem',
    backgroundColor: isHovered ? 'rgba(0, 51, 161, 0.079)' : '#FFF',
    ...props.styles,
  };

  return (
    <button
      style={buttonStyles}
      onClick={props.onClick}
      type={props.type}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {props.children}
    </button>
  )
}
