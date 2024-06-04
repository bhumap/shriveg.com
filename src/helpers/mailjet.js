const axios = require('axios');

async function mailjet(receiverEmail, receiverName, subject, message) { 
  const apiKey = '9dd6592290ad0ab8da6f031685962e17';
  const secretKey = 'b93aa7cffb1210d88adbc02fe6b8ff0f';
  const senderEmail = 'edifycit@gmail.com';
  const senderName = 'Edify College';

  const apiEndpoint = 'https://api.mailjet.com/v3.1/send';

  const auth = {
    username: apiKey,
    password: secretKey,
  };

  const emailPayload = {
    Messages: [
      {
        From: {
          Email: senderEmail,
          Name: senderName,
        },
        To: [
          {
            Email: receiverEmail,
            Name: receiverName,
          },
        ],
        Subject: subject,
        TextPart: message,
        HTMLPart: `<p>${message}</p>`,
      },
    ],
  };

  const headers = {
    'Content-Type': 'application/json',
  };

  // Making the API request using axios
  try {
    var {data} = await axios.post(apiEndpoint, emailPayload, { auth, headers })
    return data
  } catch (error) {
      console.error('Failed to send email:', error.response ? error.response.data : error.message);
    return false
  }
 
}

export default mailjet