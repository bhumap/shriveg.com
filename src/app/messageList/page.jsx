"use client";

import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";

const Page = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (user && user._id) {
      setUserId(user._id);
    }
  }, [user]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (userId) {
        try {
          const response = await axios.get(`/api/getMessage?userId=${userId}`);

          if (!response.data.success) {
            throw new Error("Failed to fetch messages.");
          }

          setMessages(response.data.data);
        } catch (error) {
          console.error("Error fetching messages:", error.message);
        }
      }
    };

    fetchMessages();
  }, [userId]);

  const handleConfirmMessage = async (UniqueId) => {
    try {
      const response = await axios.put(`/api/sendMessage`, {
        UniqueId,
        confirmedBy: "Shamsher",
      });

      if (!response.data.success) {
        throw new Error("Failed to confirm message.");
      }

      const updatedMessages = messages.map((message) =>
        message.UniqueId === UniqueId
          ? { ...message, confirmed: true, confirmedBy: "Shamsher" }
          : message
      );
      setMessages(updatedMessages);
    } catch (error) {
      console.error("Error confirming message:", error.message);
    }
  };

  return (
    <div>
      <h2>Messages for User ID: {userId}</h2>
      {messages?.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <ul>
          {messages?.map((message) => (
            <li key={message._id}>
              <p>Sender: {message.sender}</p>
              <p>Receiver: {message.receiver}</p>
              <p>Message: {message.message}</p>
              <p>Confirmed: {message.confirmed ? "Yes" : "No"}</p>
              {!message.confirmed && (
                <button onClick={() => handleConfirmMessage(message.UniqueId)}>
                  Confirm Message
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;