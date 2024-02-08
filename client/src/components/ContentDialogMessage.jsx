import '../styles/components/contentDialogMessage.css'
import { ButtonPrimary } from './ButtonPrimary'

export function ContentDialogMessage({svg, text, ...props}) {
  return <>
    <div className="dialog-message-container">
      <span>
        {svg}
      </span>
      <span className='dialog-message-text'>
        {text}
      </span>
    </div>

    <div className='button-dialo-message'>
      <ButtonPrimary onClick={props.onClick} >Aceptar</ButtonPrimary>
    </div>
  </>
}