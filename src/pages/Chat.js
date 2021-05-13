import { useContext, useState, useRef } from "react";
import { Context } from "../context/Store";
import { Button, Input, Card } from 'antd';
import { useSocket } from "../hooks/useSocket";
const { TextArea } = Input;

export default function Chat() {
  const [state, ] = useContext(Context);
  const [textMessage, setTextMessage] = useState("");
  const { socket, room } = state;
  const { isTyping, messages } = useSocket({ socket, room });
  const textAreaRef = useRef();

  function leaveChat() {
    socket.emit("leave", room);
  }

  function sendMessage() {
    textAreaRef.current.blur();
    socket.emit("message", { textMessage, room });
    messages.push({
      sender: "me",
      textMessage
    });
    setTextMessage("");
  }

  return (
    <>
      <h1>CHAT</h1>
      { messages.map((msg, idx) => <Card key={idx} title={msg.sender !== "me" ? "Stranger" : "Me"} className={msg.sender === "me" ? "me" : "you"} bordered={true}>
        <p>{msg.textMessage}</p>
      </Card>)}
      { isTyping && "Au clavier ..."}
      <TextArea
        ref={textAreaRef}
        onChange={(e) => setTextMessage(e.target.value)}
        onFocus={() => socket.emit("isTyping", { isTyping: true, room })}
        onBlur={() => socket.emit("isTyping", { isTyping: false, room })}
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
        value={textMessage} />
      <Button type='primary' onClick={sendMessage}>Send</Button>
      <br />
      <Button type='danger' onClick={leaveChat}>Leave chat</Button>
    </>
  )
}
