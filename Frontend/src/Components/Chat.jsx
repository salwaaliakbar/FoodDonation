import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

// Connect to backend WebSocket server
const socket = io("http://localhost:5000");

function Chat({ selectedUserData, user, setIsChatOpen, campaignId }) {
  // State for storing all messages in the chat
  const [messages, setMessages] = useState([]);

  // State for the currently typed message
  const [newMessage, setNewMessage] = useState("");

  // Ref to scroll to the last message
  const messagesEndRef = useRef(null);

  // Unique room ID composed of user IDs and campaign ID
  const roomId = [user._id, selectedUserData.selectedUserId, campaignId]
    .sort()
    .join("-");

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  useEffect(() => {
    // Emit joinRoom event to server with unique room ID
    socket.emit("joinRoom", roomId);

    // Listen for new messages from the server
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Load chat history from database
    socket.on("loadPreviousMessages", (msgsFromDb) => {
      setMessages(msgsFromDb);
    });

    // Cleanup listeners on component unmount
    return () => {
      socket.off("receiveMessage");
      socket.off("loadPreviousMessages");
    };
  }, [roomId]);

  useEffect(() => {
    // Scroll to the bottom when a new message is added
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return; // Prevent sending empty messages

    const now = new Date();
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Construct the message object
    const msg = {
      id: Date.now(), // Unique ID based on timestamp
      sender: user.fullname,
      senderId: user._id,
      receiver: selectedUserData.selectedusername,
      receiverId: selectedUserData.selectedUserId,
      text: newMessage.trim(),
      time,
    };

    // Send message to server via socket
    socket.emit("sendMessage", {
      roomId,
      message: msg,
    });

    // Optimistically update UI
    setMessages((prev) => [...prev, msg]);
    setNewMessage(""); // Clear input
  };

  // Handle Enter key press to send message
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 sm:p-6">
      {/* Chat container */}
      <div className="flex flex-col w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto p-4 sm:p-6 rounded-2xl shadow-lg bg-white max-h-[90vh] overflow-hidden">
        {/* Header with recipient name */}
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center text-gray-800">
          Chat with {selectedUserData.selectedusername}
        </h3>

        {/* Messages area */}
        <div
          className="flex-1 overflow-y-auto border border-gray-300 rounded p-3 mb-3 sm:mb-4 scroll-smooth"
          style={{ minHeight: "250px" }}
        >
          {/* Display if no messages yet */}
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center">No messages yet.</p>
          ) : (
            // Render each message
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
                  {/* Message text */}
                  <div className="flex-1 break-all">{msg.text}</div>

                  {/* Timestamp */}
                  <div
                    className={`text-xs ml-4 flex items-end ${
                      msg.senderId === user._id ? "text-white" : "text-gray-600"
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            ))
          )}
          {/* Ref for auto-scroll */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input and send button */}
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

        {/* Close chat button */}
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
