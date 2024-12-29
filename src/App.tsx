import { ChatForm } from './components/ChatForm'
import { ChatMessage } from './components/ChatMessage'

import {
  Robot,
  Close,
  Mode_comment,
  Keyboard_arrow_down
} from './components/Icons'
import { useEffect, useState,useRef } from'react'


export default function App() {
  const [chatHistory, setChatHistory] = useState<{text: string,role: 'user'|'bot'}[]>([])
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
  const generateBotResp = async (history: {text: string,role: 'user'|'bot'}[])=>{
    if (!((import.meta.env.VITE_API_KEY) || (process.env.VITE_API_KEY))){
      throw new Error('请设置VITE_API_KEY环境变量');
    }
    
    const Options ={
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        text: history[history.length-1].text,
        key: import.meta.env.VITE_API_KEY || process.env.VITE_API_KEY
      })
    }
    console.log(Options.body);

    fetch(import.meta.env.VITE_PROXY_URL || process.env.VITE_PROXY_URL, Options)
    .then(response => response.json())
    .then((data:string) => {
      console.log(data); // 打印响应内
      updateHistory(data);
    })
    .catch(error => {
        console.error('Error:', error); // 捕获并打印错误
    });
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
        <span >
          <Mode_comment/>
        </span>
        <span >
          <Close/>
        </span>
      </button>
      <div className="chat_popup">
        <div className="header">
          <div className="info">
            <Robot />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button onClick={() => setShowChatbot(prev=>!prev)}>
            <Keyboard_arrow_down/>
          </button>
        </div>
        <div ref={chatBodyRef} className="body">
          <div className="message bot-message">
          <Robot />
          <p className='message-text'>
            Hello, how can I help you?<br/>
            I am a chatbot created by a developer.
          </p>
          </div>
          {chatHistory.map((chat,i: number) => (
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


