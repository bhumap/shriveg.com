"use client"

import React, { useState } from 'react';

const SendMessageForm = () => {
  const [senderId, setSenderId] = useState('');
  const [message, setMessage] = useState('');
  const [confirmedBy, setConfirmedBy] = useState('');
  const [confirmationMessageId, setConfirmationMessageId] = useState('668390455682d083db3b8b17');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId,
          message,
          confirmedBy,
        }),
      });

      if (!response.ok) {
        throw new Error('Message could not be sent.');
      }

      const data = await response.json();
      console.log('Message sent successfully:', data);

      // Store the message ID for future confirmation
      setConfirmationMessageId(data.data._id);

      // Handle success, e.g., show success message to user

    } catch (error) {
      console.error('Error sending message:', error.message);
      // Handle error, e.g., show error message to user
    }
  };

  const handleConfirmMessage = async () => {
    try {
      const response = await fetch('/api/sendMessage', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageId: confirmationMessageId,
        }),
      });

      if (!response.ok) {
        throw new Error('Message confirmation failed.');
      }

      const data = await response.json();
      console.log('Message confirmed successfully:', data);

      // Handle success, e.g., update UI to indicate message confirmation

    } catch (error) {
      console.error('Error confirming message:', error.message);
      // Handle error, e.g., show error message to user
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

      {confirmationMessageId && (
        <div>
          <button onClick={handleConfirmMessage}>Confirm Message</button>
        </div>
      )}
    </div>
  );
};

export default SendMessageForm;
