import '../styles/components/cardMenu.css'
import { Link } from 'react-router-dom';

export function CardMenu({ title, options }) {
  return (
    <article className='card-option col-12 col-md-6 col-lg-4'>
      <div className='card-option-container'>
        <div className='card-option-header-container'>
          <header className='card-option-header'>
            <h2>{title}</h2>
          </header>
        </div>
        <div className='card-options'>
          {options.map((option, index) => (
            <Link to={option.href} key={index} className='option-link'>{option.label}</Link>
          ))}
        </div>
      </div>
    </article>
  );
}
