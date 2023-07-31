function sendMessage() {
    var messageInput = document.getElementById("messageInput");
    var message = messageInput.value.trim();

    if (message !== "") {
      addMessageToChat("나", message);
      messageInput.value = "";

      // Send the message to the backend API
      fetch('http://127.0.0.1:8000/api/chat/gpt/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_input: message
        })
      })
      .then(response => response.json())
      .then(data => {
        // Add AI response to the chat
        addMessageToChat("AI", data.response);
      })
      .catch(error => console.error('Error:', error));
    }
  }

  // Function to add a message to the chat box
  function addMessageToChat(sender, message) {
    var chatBox = document.getElementById("chatBox");
    var newMessage = document.createElement("div");
    newMessage.textContent = sender + ": " + message;
    chatBox.appendChild(newMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function loadChatHistory() {
    fetch('http://127.0.0.1:8000/api/chat/gpt/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      // Display chat history in the chat box
      data.conversations.forEach(conversation => {
        addMessageToChat(conversation.role, conversation.content);
      });
    })
    .catch(error => console.error('Error:', error));
  }

  // Load chat history when the page loads
  window.addEventListener('load', loadChatHistory);

  // Handle Enter key press event
  var messageInput = document.getElementById("messageInput");
  messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }

  });