import RobotIcon from './RobotIcon'
import Chat from './Types'

export const ChatMessage = ({chat}:{chat:Chat}) => {
  return (
    <div className={`message ${chat.role}-message`}>
      {chat.role==='bot' && <RobotIcon/>}
      <p className='message-text'>
        {chat.text}
      </p>
    </div>
  )
}
