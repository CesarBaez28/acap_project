import '../styles/components/mainContent.css'

export function MainContent ({content}) {
  return (
    <main className="main-content">
      <div className="main-container">
        {content}
      </div>
    </main>
  )
}