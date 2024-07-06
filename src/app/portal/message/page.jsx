"use client";

import React, { useState } from "react";

const SendMessageForm = () => {
  const [senderId, setSenderId] = useState("");
  const [message, setMessage] = useState("");
  const [confirmedBy, setConfirmedBy] = useState("");

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

      if (!response.ok) {
        throw new Error("Message could not be sent.");
      }

      const data = await response.json();
      console.log("Message sent successfully:", data);
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="senderId">Sender ID:</label>
          <input
            type="text"
            id="senderId"
            value={senderId}
            onChange={(e) => setSenderId(e.target.value)}
            required
          />
        </div>
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
