import '../styles/components/details.css'

export function Details({ date, title, content }) {
  return (
    <details>
      <summary className='summary'>
        <header>
          <h4 className='title-date-summary'>{date}</h4>
          <h3 className='title-summary'>{title}</h3>
        </header>
      </summary>
      <article className='content-summary-container'>
        {content}
      </article>
    </details>
  )
}