/* eslint-disable react/prop-types */
export function ButtonPrimary(props) {

  const buttonStyles = {
    padding: '.7rem 1rem',
    borderRadius: '0.5rem',
    border: "1px solid #0033A1",
    backgroundColor: '#0033A1',
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: '1rem',
    ...props.styles,
    ...props.additionalStyles
  };

  return (
    <button
      style={buttonStyles}
      onClick={props.onClick}
      type={props.type}
    >
      {props.children}
    </button>
  )
}