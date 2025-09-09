import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Chatbot.css";
import { TbMessageChatbot } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const speakMessage = (str: string) => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(str);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };

  // Reuse existing task endpoints
  const processBotAction = async (actionObj: any) => {
    let botReply = "";
    const token = sessionStorage.getItem("token");
    const id = sessionStorage.getItem("_Id");

    try {
      if (actionObj.action === "add") {
        if (token && id) {
          await axios.post(
            `https://task-management-backend-xz9k.onrender.com/api/tasks/add/${id}`,
            {
              task_title: actionObj.task,
              task_desc: "Added via chatbot",
              user_id: id,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          botReply = `Added task: ${actionObj.task}`;
        } else {
          botReply = "Please Sign In to add tasks.";
        }
      } else if (actionObj.action === "delete") {
        if (token) {
          await axios.delete(
            `https://task-management-backend-xz9k.onrender.com/api/tasks/delete/${actionObj.id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if(actionObj.task==String){
            botReply = `please provide the id of the task you want to delete`;
          }else{
          botReply = `Deleted task with id: ${actionObj.id}`;
          }
        } else {
          botReply = "Please Sign In to delete tasks.";
        }
      } else if (actionObj.action === "update") {
        if (token) {
          await axios.put(
            `https://task-management-backend-xz9k.onrender.com/api/tasks/update/${actionObj.id}`,
            { 
              task_title: actionObj.task,
              // task_desc: "Updated via chatbot",
             },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          botReply = `Updated task to: ${actionObj.task}`;
        } else {
          botReply = "Please Sign In to update tasks.";
        }
      } else if (actionObj.action === "list") {
        if (token && id) {
          const res = await axios.get(
            `https://task-management-backend-xz9k.onrender.com/api/users/tasks/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (res.data.length > 0) {
            botReply =
              "Your tasks:\n" +
              res.data.map((t: any) => `- Task ID: (${t._id}), Title: ${t.task_title}, Description: ${t.task_desc};`).join("\n");
          } else {
            botReply = "No tasks found.";
          }
        } else {
          botReply = "Please Sign In to view tasks.";
        }
      } else {
        botReply = "I didn't understand that.";
      }
    } catch (err) {
      console.error("Error in action:", err);
      botReply = "Failed to perform action.";
    }

    setChatHistory((prev) => [...prev, { sender: "bot", text: botReply }]);
    speakMessage(botReply);
  };

  const sendChat = async () => {
    if (!message.trim()) return;

    // Show user message
    setChatHistory((prev) => [...prev, { sender: "user", text: message }]);

    try {
      const response = await axios.post("https://task-management-backend-xz9k.onrender.com/api/chat", {
        message,
      });

      const { reply, action } = response.data;

      if (reply) {
        setChatHistory((prev) => [...prev, { sender: "bot", text: reply }]);
        speakMessage(reply);
      }

      if (action) {
        await processBotAction(action);
      }
    } catch (error) {
      console.error("Error sending chat:", error);
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: "Error connecting to chatbot." },
      ]);
    }

    setMessage(""); // clear input
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendChat();
  };

  return (
    <div className="bg-light bg-white chatbot">
      <div className="container-fluid mt-5">
        <div className="bg-danger d-flex align-items-center p-2">
          <button
            className="btn btn-danger me-3"
            onClick={() => window.location.replace("/")}
          >
            <IoMdArrowRoundBack size={24} />
          </button>
          <TbMessageChatbot
            className="me-2 rounded-circle bg-white p-1"
            style={{ width: "36px", height: "36px" }}
          />
          <h2 className="mb-0 text-white">Chatbot</h2>
        </div>

        {/* Chat history */}
        <div
          id="chat-box"
          ref={chatBoxRef}
          className="mb-3 bg-white p-3 rounded"
          style={{ height: "400px", overflowY: "auto", whiteSpace: "pre-line" }}
        >
          {chatHistory.length === 0 ? (
            <div>👋 Welcome to ToDo AI Agent!</div>
          ) : (
            chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 d-flex ${
                  msg.sender === "user" ? "justify-content-end" : "justify-content-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <TbMessageChatbot
                    className="me-2"
                    style={{ width: "32px", height: "32px" }}
                  />
                )}
                <span
                  className={`p-2 rounded ${
                    msg.sender === "user"
                      ? "bg-primary text-white me-2"
                      : "bg-success text-white"
                  }`}
                >
                  {msg.text}
                </span>
                {msg.sender === "user" && (
                  <FaRegUser style={{ width: "25px", height: "25px" }} />
                )}
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="input-group chatarea shadow-sm">
          <input
            id="user-input"
            type="text"
            value={message}
            onChange={handleText}
            onKeyDown={handleKeyDown}
            className="form-control me-2"
            placeholder="Type your message..."
          />
          <div className="input-group-append">
            <button
              type="button"
              onClick={sendChat}
              id="send-btn"
              className="btn btn-primary"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;


