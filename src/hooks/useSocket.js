import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {notification } from 'antd';

export const useSocket = ({ socket, room}) => {
  const history = useHistory();
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // USER NOT ALLOWED TO BE HERE
    if (!socket || !room) {
      history.replace("/");
      return;
    }

    socket.on("isTyping", (isTyping) => {
      setIsTyping(isTyping);
    });

    socket.on("strangerLeave", (roomName) => {
      notification.error({
        message: "Error",
        description: "Stranger leave the chat"
      });
      history.replace("/");
    });

    socket.on("youLeave", () => {
      notification.error({
        message: "Error",
        description: "You leave the chat"
      });
      history.replace("/");
    });

    socket.on("newMessage", ({ textMessage, sender }) => {
      console.log(sender)
      messages.push({
        textMessage,
        sender
      });
      setMessages(messages);
      notification.info({
        message: "New mesage",
        description: textMessage
      });
    });

    // ON DESTROY
    return () => {
      console.log("DESTROY");
      history.replace("/");
    }
  }, [socket, history, room, messages]);

  return {
    isTyping,
    messages
  };

};