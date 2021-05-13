import { useContext, useState, useRef } from "react";
import { Context } from "../context/Store";
import { Button, Input, Card } from 'antd';
import { useSocket } from "../hooks/useSocket";
const { TextArea } = Input;

export default function Chat() {
  const [state, ] = useContext(Context);
  const { socket, room } = state;
  const { isTyping, messages } = useSocket({ socket, room });
  const textAreaRef = useRef();
  const [textMessage, setTextMessage] = useState("");

  function sendMessage() {
    textAreaRef.current.blur();
    messages.push({
      sender: "me",
      textMessage: textMessage.trim()
    });
    socket.emit("message", { textMessage, room });
    setTextMessage("");
  }

  return (
    <>
      <h1>CHAT</h1>
      { messages.map((msg, idx) => <Card key={idx} title={msg.sender !== "me" ? "Stranger" : "Me"} className={msg.sender === "me" ? "me" : "you"} bordered={true}>
        <pre>{msg.textMessage}</pre>
      </Card>)}
      { isTyping && "Au clavier ..."}
      <TextArea
        ref={textAreaRef}
        onChange={(e) => setTextMessage(e.target.value)}
        onFocus={() => socket.emit("isTyping", { isTyping: true, room })}
        onBlur={() => socket.emit("isTyping", { isTyping: false, room })}
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && textMessage.trim() && sendMessage()}
        value={textMessage} />
      <Button type='primary' onClick={sendMessage} disabled={!textMessage.trim()}>Send</Button>
      <br />
      <Button type='danger' onClick={() => socket.emit("leave", room)}>Leave chat</Button>
    </>
  )
}
