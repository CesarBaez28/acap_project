import '../styles/components/loadingIndicator.css'

export function LoadingIndicator () {
  return (
    <div className="loading-indicator">
      <div className="loading-indicator-spinner"></div>
      <h3>Loading...</h3>
    </div>
  )
}