import React, { useState, useEffect, useRef } from "react";

function Chat({ selectedUser, user, setIsChatOpen }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message handler
  function handleSendMessage() {
    if (!newMessage.trim()) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const msg = {
      id: Date.now(), // simple id
      sender: user.fullname,
      text: newMessage.trim(),
      time,
    };

    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
  }

  // Allow sending on Enter key (Shift+Enter for newline)
  function handleKeyPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="flex flex-col w-lg mx-auto p-4 rounded-2xl shadow-lg bg-white max-w-[500px]">
        <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">
          Chat with {selectedUser.fullname}
        </h3>
        <div
          className="flex-1 overflow-y-auto border border-gray-400 rounded p-3 mb-4"
          style={{ minHeight: "250px" }}
        >
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center">No messages yet.</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-2 flex ${
                  msg.sender === user.fullname ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex justify-between px-4 py-1 rounded-lg max-w-[70%] min-w-[30%] ${
                    msg.sender === user.fullname
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {/* <div className="text-xs font-semibold">{msg.sender}</div> */}
                  <div className="flex">{msg.text}</div>
                  <div className="text-xs text-white flex justify-center items-end ml-4">
                    {msg.time}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex gap-2">
          <textarea
            rows={2}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-grow border border-gray-400 rounded px-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button
            onClick={handleSendMessage}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition cursor-pointer"
          >
            Send
          </button>
        </div>

        <button
          onClick={() => setIsChatOpen(false)}
          className="mt-4 text-center text-sm text-gray-600 hover:text-gray-900 underline"
        >
          Close Chat
        </button>
      </div>
    </div>
  );
}

export default Chat;
