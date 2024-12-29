import { ChatForm } from './components/ChatForm'
import { ChatMessage } from './components/ChatMessage'
import Chat from './components/Types'
import RobotIcon from './components/RobotIcon'
import { useEffect, useState,useRef } from'react'


export default function App() {
  const [chatHistory, setChatHistory] = useState<Chat[]>([])
  const [showChatbot, setShowChatbot] = useState<boolean>(false)
  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  const updateHistory = (text: string) => {
    setChatHistory((prev) => [
      ...prev.filter(chat=>chat.text!=='Thinking...'),
      {
        role:'bot',
        text: text,
      }
    ])
  }
  const generateBotResp = async (history: Chat[])=>{
    const Options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: history[history.length-1].text,
        key: import.meta.env.VITE_API_KEY
      })
    };
    console.log(Options.body);
    
    fetch('https://aiapi.sishuic.us.kg/api', Options)
     .then(response => {
      console.log(response);
      return response.json()
    })
     .then((data: string) => {
      console.log(data);
      updateHistory(data)
     })
     .catch(error => console.error(error))

  }

  useEffect(()=>{
    chatBodyRef.current!.scrollTo({
      top:chatBodyRef.current!.scrollHeight!,
      behavior: "smooth"
    })
  },[chatHistory])
  return (
    <main className={showChatbot?'show-chatbot':''}>
      <button onClick={() => setShowChatbot(prev=>!prev)} id="toggler">
        <span className="material-symbols-rounded">
          mode_comment
        </span>
        <span className="material-symbols-rounded">
          close
        </span>
      </button>
      <div className="chat_popup">
        <div className="header">
          <div className="info">
            <RobotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button onClick={() => setShowChatbot(prev=>!prev)} className="material-symbols-rounded">
            keyboard_arrow_down
          </button>
        </div>
        <div ref={chatBodyRef} className="body">
          <div className="message bot-message">
          <RobotIcon />
          <p className='message-text'>
            Hello, how can I help you?<br/>
            I am a chatbot created by a developer.
          </p>
          </div>
          {chatHistory.map((chat: Chat, i: number) => (
            <ChatMessage chat={chat} key={i} />
          ))}
        </div>
          
        <div className="footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResp={generateBotResp} />
        </div>

      </div>
    </main>
  )
  
}


