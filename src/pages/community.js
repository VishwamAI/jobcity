import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaForumbee, FaUsers, FaBook } from 'react-icons/fa';

const CommunityPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [ws, setWs] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:3005');
    setWs(websocket);

    websocket.onopen = () => {
      console.log('WebSocket connection established');
      setConnectionStatus('Connected');
    };

    websocket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('Error connecting');
    };

    websocket.onclose = (event) => {
      console.log('WebSocket connection closed:', event.code, event.reason);
      setConnectionStatus('Disconnected');
    };

    return () => {
      if (websocket.readyState === WebSocket.OPEN) {
        websocket.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() && ws && ws.readyState === WebSocket.OPEN) {
      const message = { text: inputMessage, sender: 'User', timestamp: new Date().toISOString() };
      ws.send(JSON.stringify(message));
      setInputMessage('');
    } else if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not open. Current state:', ws ? ws.readyState : 'No WebSocket');
      setConnectionStatus('Disconnected');
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className={`md:w-64 bg-gray-800 p-4 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
        <h1 className="text-2xl font-bold mb-6">Job-City Community</h1>
        <nav>
          <Link href="/community/forums" className="flex items-center py-2 hover:text-blue-400 hover:bg-gray-700 rounded px-2">
            <FaForumbee className="mr-2" /> Forums
          </Link>
          <Link href="/community/study-groups" className="flex items-center py-2 hover:text-blue-400 hover:bg-gray-700 rounded px-2">
            <FaUsers className="mr-2" /> Study Groups
          </Link>
          <Link href="/community/resources" className="flex items-center py-2 hover:text-blue-400 hover:bg-gray-700 rounded px-2">
            <FaBook className="mr-2" /> Resources
          </Link>
        </nav>
        {/* User Profile */}
        <div className="mt-8 border-t border-gray-700 pt-4">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500 mr-3"></div>
            <div>
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-gray-400">{connectionStatus}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="md:hidden p-4 bg-gray-800">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white">
            {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Live Chat</h2>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500">
                <p>Welcome to the Job-City Community Chat!</p>
                <p>Start a conversation or wait for others to join.</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className="bg-gray-800 p-3 rounded-lg">
                  <span className="font-bold">{msg.sender}: </span>
                  <span>{msg.text}</span>
                </div>
              ))
            )}
          </div>
        </div>
        {/* Chat Input */}
        <div className="p-4 bg-gray-800">
          <div className="flex flex-col md:flex-row">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-grow bg-gray-700 text-white px-4 py-2 rounded-t md:rounded-l md:rounded-t-none focus:outline-none mb-2 md:mb-0 border border-gray-600 shadow-inner"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-6 py-2 rounded-b md:rounded-r md:rounded-b-none hover:bg-blue-600 transition duration-200 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-300"
              disabled={connectionStatus !== 'Connected'}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
