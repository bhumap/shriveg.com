"use client";

import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const SendMessageForm = () => {
  const { user } = useContext(AuthContext);
  const [senderId, setSenderId] = useState("");
  const [message, setMessage] = useState("New Order");
  const [confirmedBy, setConfirmedBy] = useState("");

  useEffect(() => {
    if (user && user._id) {
      setSenderId(user._id);
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId,
          message,
          confirmedBy,
        }),
      });
  
      const data = await response.json();
      alert("Message sent successfully");
      console.log("Message sent successfully:", data);
    } catch (error) {
      console.error("Error sending message:", error.message);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default SendMessageForm;