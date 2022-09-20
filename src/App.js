import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
const socket = io.connect('http://localhost:3001');

function App() {
  const [msg, setMsg] = useState('');
  const [msgReceived, setMsgReceived] = useState("");

  const sendMessage = () => {
    console.log(msg)
    socket.emit('send_message', { msg }) 
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMsgReceived(data.msg)
    })
  }, [socket])

  return (
    <div className="App">
      <input
        placeholder="Message..."
        onChange={(event) => setMsg(event.target.value)}
      />
      <button
        onClick={sendMessage}
      >
        Send Message
      </button>
      <h1>
        Message:{msgReceived}
      </h1>
    </div>
  );
}

export default App;
