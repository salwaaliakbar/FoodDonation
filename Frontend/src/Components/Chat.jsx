import React, { useState, useEffect, useRef } from "react";
import { useSocket } from "../context/SocketProvider"

function Chat({ selectedUserData, user, setIsChatOpen, campaignId }) {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const roomId = [user._id, selectedUserData.selectedUserId, campaignId]
    .sort()
    .join("-");

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    const loadHandler = (msgs) => setMessages(msgs);
    const receiveHandler = (msg) =>
      setMessages((prev) => [...prev, msg]);

    socket.on("loadPreviousMessages", loadHandler);
    socket.on("receiveMessage", receiveHandler);

    return () => {
      socket.off("loadPreviousMessages", loadHandler);
      socket.off("receiveMessage", receiveHandler);
    };
  }, [socket, roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const msg = {
      id: Date.now(),
      sender: user.fullname,
      senderId: user._id,
      receiver: selectedUserData.selectedusername,
      receiverId: selectedUserData.selectedUserId,
      text: newMessage.trim(),
      time,
    };

    socket.emit("sendMessage", { roomId, message: msg });
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
      <div className="flex flex-col w-full max-w-md mx-auto p-4 rounded-2xl shadow-lg bg-white max-h-[90vh]">
        <h3 className="text-center text-xl font-semibold mb-4">
          Chat with {selectedUserData.selectedusername}
        </h3>

        <div className="flex-1 overflow-y-auto p-3 border rounded mb-3">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500">No messages yet.</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-2 flex ${
                  msg.senderId === user._id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[85%] ${
                    msg.senderId === user._id
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 text-gray-900"
                  }`}
                >
                  <div>{msg.text}</div>
                  <div className="text-xs mt-1">
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
            className="flex-grow border rounded px-3 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button
            onClick={handleSendMessage}
            className="bg-green-800 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>

        <button
          onClick={() => setIsChatOpen(false)}
          className="mt-3 text-sm text-center text-gray-600 hover:underline"
        >
          Close Chat
        </button>
      </div>
    </div>
  );
}

export default Chat;
