import Dissatisfied from '../assets/dissatisfied.svg?react'
import '../styles/components/notFoundMessage.css'

export function NotFoundMessage({ text }) {
  return (
    <div className='not-found-message-container'>
      <div>
        <Dissatisfied />
        <h4 className='not-found-text'>{text}</h4>
      </div>
    </div>
  )
}