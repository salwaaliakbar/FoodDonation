import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

// Connect to backend
const socket = io("http://localhost:5000");

function Chat({ selectedUser, user, setIsChatOpen, campaignId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Generate consistent roomId (donor & recipient)
  const roomId = [user._id, selectedUser._id, campaignId].sort().join("-");

  useEffect(() => {
    // Join room
    socket.emit("joinRoom", roomId);

    // Receive message from server
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Receive previous messages from DB
    socket.on("loadPreviousMessages", (msgsFromDb) => {
      setMessages(msgsFromDb);
    });

    // Cleanup on unmount
    return () => {
      socket.off("receiveMessage");
      socket.off("loadPreviousMessages");
    };
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const msg = {
      id: Date.now(),
      sender: user.fullname,
      senderId: user._id,
      receiver: selectedUser.fullname,
      receiverId: selectedUser._id,
      text: newMessage.trim(),
      time,
    };

    // Emit message to server with roomId
    socket.emit("sendMessage", {
      roomId,
      message: msg,
    });

    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 sm:p-6">
      <div className="flex flex-col w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto p-4 sm:p-6 rounded-2xl shadow-lg bg-white max-h-[90vh] overflow-hidden">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center text-gray-800">
          Chat with {selectedUser?.fullname}
        </h3>

        <div
          className="flex-1 overflow-y-auto border border-gray-300 rounded p-3 mb-3 sm:mb-4 scroll-smooth"
          style={{ minHeight: "250px" }}
        >
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center">No messages yet.</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-2 flex ${
                  msg.senderId === user._id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex justify-between px-3 py-2 rounded-lg max-w-[85%] sm:max-w-[70%] min-w-[30%] break-words ${
                    msg.senderId === user._id
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 text-gray-900"
                  }`}
                >
                  <div className="flex-1 break-all">{msg.text}</div>
                  <div
                    className={`text-xs ml-4 flex items-end ${
                      msg.senderId === user._id
                        ? "text-white"
                        : "text-gray-600"
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
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
            className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer"
          >
            Send
          </button>
        </div>

        <button
          onClick={() => setIsChatOpen(false)}
          className="mt-3 text-center text-sm text-gray-600 hover:text-gray-900 underline cursor-pointer"
        >
          Close Chat
        </button>
      </div>
    </div>
  );
}

export default Chat;
