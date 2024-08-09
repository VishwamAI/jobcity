import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const CommunityPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:3001');
    setWs(websocket);

    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    return () => {
      websocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() && ws) {
      const message = { text: inputMessage, sender: 'User', timestamp: new Date().toISOString() };
      ws.send(JSON.stringify(message));
      setInputMessage('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Job-City Community</h1>
      <p className="mb-4">Welcome to the Job-City Community! Connect with other learners and experts.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Discussion Forums</h2>
          <p>Join conversations on various topics related to job skills and career development.</p>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Browse Forums
          </button>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Live Chat</h2>
          <p>Engage in real-time discussions with peers and mentors.</p>
          <div className="mt-2 h-64 overflow-y-auto border border-gray-300 p-2 mb-2">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <span className="font-bold">{msg.sender}: </span>
                <span>{msg.text}</span>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-grow border border-gray-300 rounded-l px-2 py-1"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="bg-green-500 text-white px-4 py-1 rounded-r hover:bg-green-600"
            >
              Send
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Study Groups</h2>
          <p>Form or join study groups to collaborate on learning objectives.</p>
          <button className="mt-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
            Find Study Groups
          </button>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Resource Sharing</h2>
          <p>Share and discover valuable learning resources with the community.</p>
          <button className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            Explore Resources
          </button>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-blue-500 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default CommunityPage;
