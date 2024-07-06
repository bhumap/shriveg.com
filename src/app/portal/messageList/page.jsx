"use client";

import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import "@/Style/style.css";

const Page = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");
  const [conf, setConf] = useState("");

  useEffect(() => {
    if (user && user._id) {
      setUserId(user._id);
      setConf(user.fullName);
    }
  }, [user]);

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

  useEffect(() => {
    fetchMessages();
  }, [userId]);

  const handleConfirmMessage = async (UniqueId) => {
    try {
      const response = await axios.put(`/api/sendMessage`, {
        UniqueId,
        confirmedBy: conf,
      });

      if (!response.data.success) {
        throw new Error("Failed to confirm message.");
      }

      await fetchMessages();
    } catch (error) {
      console.error("Error confirming message:", error.message);
    }
  };

  return (
    <div className="addmessage-box">
      <div className="message-heading message-heading1">
        <div className="message-hed-in">
          <h4>Oders</h4>
        </div>
        <div className="message-hed-in">
          <h4>Message</h4>
        </div>
        <div className="message-hed-in">
          <h4>To</h4>
        </div>
        <div className="message-hed-in">
          <h4>From</h4>
        </div>
        <div className="message-hed-in">
          <h4>Accepted By</h4>
        </div>
        <div className="message-hed-in">
          <h4>Oder Accepte</h4>
        </div>
      </div>

      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <>
          {messages.map((message, index) => (
            <div className="message-heading" key={message._id}>
              <div className="message-hed-in">
                <h4>.{index + 1}</h4>
              </div>
              <div className="message-hed-in">
                <h4>{message.message}</h4>
              </div>
              <div className="message-hed-in">
                <h4>Delhi</h4>
              </div>
              <div className="message-hed-in">
                <h4>Mumbai</h4>
              </div>
              <div className="message-hed-in">
                <h4>{message.confirmedBy}</h4>
              </div>
              <div className="message-hed-in">
                {!message.confirmed && (
                  <button
                    className="oder-btn"
                    onClick={() => handleConfirmMessage(message.UniqueId)}
                  >
                    {message.confirmed ? "Yes" : "Pending"}
                  </button>
                )}
                {message.confirmed && (
                  <button className="oder-btn">Confirm</button>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Page;
