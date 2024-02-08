import '../styles/components/buttonCreate.css'
import { Link } from 'react-router-dom'

export function ButtonCreateLink({ text, svg, href }) {
  return (
    <div className="button-create-container">
      <Link to={href} className="button-create">
        {svg}
        <span>
          {text}
        </span>
      </Link>
    </div>
  )
}