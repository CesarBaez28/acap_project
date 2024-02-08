import "../styles/components/card.css"

export function Card ({children}) {
  return (
    <div className= "info-card">
    <div className="info-card-container">
      {children}
    </div>
  </div>
  )
}