import { useRef } from "react";
import { Arrow_upward } from "./Icons";
type Chat = {text: string,role: 'user'|'bot'}

export const ChatForm = (
  {chatHistory,setChatHistory,generateBotResp}:
  {
    chatHistory:{text: string,role: 'user'|'bot'}[],
    setChatHistory:React.Dispatch<React.SetStateAction<Chat[]>>,
    generateBotResp:(history: {text: string,role: 'user'|'bot'}[]) => void
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
        setChatHistory((history:{text: string,role: 'user'|'bot'}[])=> [...history, {role: "bot", text: 'Thinking...'}]);
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
      <button >
        <Arrow_upward/>
      </button>
    </form>
  )
}
