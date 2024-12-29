import {Robot} from './Icons'


export const ChatMessage = ({chat}:{chat:{text: string,role: 'user'|'bot'}}) => {
  return (
    <div className={`message ${chat.role}-message`}>
      {chat.role==='bot' && <Robot/>}
      <p className='message-text'>
        {chat.text}
      </p>
    </div>
  )
}
