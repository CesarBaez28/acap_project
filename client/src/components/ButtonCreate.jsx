import '../styles/components/buttonCreate.css'

export function ButtonCreate({ text, svg, onClick }) {
  return (
    <div className="button-create-container">
      <button onClick={onClick} className="button-create">
        {svg}
        <span>
          {text}
        </span>
      </button>
    </div>
  )
}