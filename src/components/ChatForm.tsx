import { useRef } from "react";
import Chat from './Types'



export const ChatForm = (
  {chatHistory,setChatHistory,generateBotResp}:
  {
    chatHistory:Chat[],
    setChatHistory:React.Dispatch<React.SetStateAction<Chat[]>>,
    generateBotResp:(history: Chat[]) => void
  }
) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if (inputRef.current) {
      const userMessage = inputRef.current!.value.trim();
      if (!userMessage) return;
      inputRef.current!.value = "";

      setChatHistory((history:Chat[])=> [...history, {role: "user", text: userMessage}]);

      setTimeout(() => {
        setChatHistory((history:Chat[])=> [...history, {role: "bot", text: 'Thinking...'}]);
        generateBotResp([...chatHistory,{role: "user", text: userMessage}]);

      },600)
    }
   
  }
  return (
    <form action="#" className='chat-form' onSubmit={handleFormSubmit}>
      <input ref={inputRef} type="text" 
        required
        className='message-input'
        placeholder="Type a message"
        
      />
      <button className="material-symbols-rounded">
        arrow_upward
      </button>
    </form>
  )
}
