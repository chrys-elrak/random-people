import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/Store';
import { Button, notification } from "antd";

export default function Home() {
  const [state, dispatch] = useContext(Context);
  const history = useHistory();
  const { socket, isLoading } = state;

  useEffect(() => {
    if (!socket) return;

    socket.on("strangerJoin", (roomName) => {
      dispatch({ type: 'SET_IS_LOADING', payload: false });
      dispatch({ type: 'SET_ROOM', payload: roomName });
      notification.info({
        message: 'Info',
        description: "Stranger join chat"
      });
      history.replace("/chat");
    });

    socket.on("joined", (roomName) => {
      dispatch({ type: 'SET_IS_LOADING', payload: false });
      dispatch({ type: 'SET_ROOM', payload: roomName });

      notification.info({
        message: 'Info',
        description: "You join chat"
      });
      history.replace("/chat");
    });

  }, [socket, dispatch, history]);

  function chat() {
    if (!socket) return;
    socket.emit("chat");
    dispatch({ type: 'SET_IS_LOADING', payload: true });
  }


  return <>
    <h1>Home page</h1>
    <Button type="primary" loading={isLoading} onClick={chat} size="large">Chat</Button>
  </>;
}
