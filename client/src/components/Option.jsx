import '../styles/components/option.css';
import { Link } from 'react-router-dom';

export function Option({ name, href, svg, onClickFunction }) {
  const handleClick = () => {
    if (onClickFunction && typeof onClickFunction === 'function') {
      onClickFunction();
    }
  }

  return (
    <Link to={href} className='link' onClick={handleClick}>
      <div className='option'>
        <span>
          {svg}
        </span>
        <h6>{name}</h6>
      </div>
    </Link>
  )
}
