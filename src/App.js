import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://live-backend-08hk.onrender.com'); // Backend URL

const Chat = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    useEffect(() => {
        // Listen for incoming messages
        socket.on('message', (data) => {
            setChat((prev) => [...prev, data]);
        });

        return () => socket.off('message');
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('message', message);
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Live Chat</h2>
            <div style={{ border: '1px solid #ccc', padding: '10px', height: '200px', overflowY: 'scroll' }}>
                {chat.map((msg, idx) => (
                    <p key={idx}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
