// Load chat history and check user authentication status when the page loads
window.addEventListener('load', function() {
    checkAuthenticationStatus();
    loadChatHistory();

});

// Function to check user authentication status and display the appropriate buttons
function checkAuthenticationStatus() {
    const token = localStorage.getItem('token');
    const authMessage = document.getElementById('authMessage');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const registerBtn = document.getElementById('registerBtn');

    if (token) {
        // User is authenticated, show the "Logout" button and hide "Login" and "Register" buttons
        authMessage.style.display = 'none';
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        registerBtn.style.display = 'none';
    } else {
        // User is not authenticated, show the "Login" and "Register" buttons and display login message
        authMessage.style.display = 'block';
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        registerBtn.style.display = 'block';
    }
}

// Function to handle logout button click event
document.getElementById('logoutBtn').addEventListener('click', function() {
    logout();
});


function sendMessage() {
    var messageInput = document.getElementById("messageInput");
    var message = messageInput.value.trim();

    if (message !== "") {
        messageInput.value = "";
        addMessageToChat("user", message);

        // Get the token from local storage
        const token = localStorage.getItem('token');

        // Send the message to the backend API with the token in the headers
        fetch('https://api.sungbinlee.dev/api/chat/gpt/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}` // Include the token in the headers
                },
                body: JSON.stringify({
                    user_input: message
                })
            })
            .then(response => response.json())
            .then(data => {
                // Add AI response to the chat
                addMessageToChat("assistant", data.response);
                playTextToSpeech(data.audio_url);
            })
            .catch(error => console.error('Error:', error));
    }
}

// Function to add a message to the chat box
function addMessageToChat(sender, message) {
    var chatBox = document.getElementById("chatBox");
    var newMessage = document.createElement("div");
    newMessage.textContent = message;

    // Add CSS classes based on the sender's role
    if (sender === "user") {
        newMessage.classList.add("user-message");
    } else if (sender === "assistant") {
        newMessage.classList.add("assistant-message");
    }

    chatBox.appendChild(newMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function loadChatHistory() {
    const token = localStorage.getItem('token');
    checkChatRequestCount()
    if (token) {
        fetch('https://api.sungbinlee.dev/api/chat/gpt/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}` // Include the token in the headers
                }
            })
            .then(response => {
                if (response.status === 401) {
                    // User is not authenticated, display a message or redirect to login page
                    console.log('User is not authenticated.');
                    return [];
                } else {
                    return response.json();
                }
            })
            .then(data => {
                // Display chat history in the chat box
                if (data.conversations.length > 0) {
                    for (let i = 1; i < data.conversations.length; i++) {
                        const conversation = data.conversations[i];
                        addMessageToChat(conversation.role, conversation.content);
                    }
                    document.getElementById("startInterviewBox").style.display = "none";
                } else {
                    document.getElementById("startInterviewBox").style.display = "block";
                }
            })
            .catch(error => console.error('Error:', error));
    } else {
        // User is not authenticated, display a message or redirect to login page
        console.log('User is not authenticated.');
    }
}

function startInterview() {
    const interviewTopicInput = document.getElementById("interviewTopicInput");
    const interviewTopic = interviewTopicInput.value.trim();

    const token = localStorage.getItem('token');
    // Check if the interview topic is not empty
    if (interviewTopic !== "") {
        fetch('https://api.sungbinlee.dev/api/chat/gpt/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}` // Include the token in the headers
                },
                body: JSON.stringify({
                    interview_topic: interviewTopic 
                  })
            })
            .then(response => response.json())
            .then(data => {
                // Add AI response to the chat
                addMessageToChat("assistant", data.response);
                playTextToSpeech(data.audio_url);
            })
            .catch(error => console.error('Error:', error));
        document.getElementById("startInterviewBox").style.display = "none";
        document.getElementById("messageInput").focus();
    }
}

function startSpeechToText() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.lang = 'ko-KR'; // Set the language to Korean (you can change it to another supported language)

        recognition.onresult = function(event) {
            const speechText = event.results[0][0].transcript;
            document.getElementById('messageInput').value = speechText;
        };

        recognition.onerror = function(event) {
            if (event.error === 'no-speech') {
                console.log('No speech detected. Please try again.');
            } else {
                console.error('Speech recognition error:', event.error);
            }
        };

        recognition.onend = function() {
            console.log('Speech recognition ended.');
        };

        recognition.start();
    } else {
        alert('Speech-to-text not supported in your browser.');
    }
}

function playTextToSpeech(audioUrl) {
    var ttsAudio = document.getElementById("ttsAudio");
    ttsAudio.src = audioUrl;
    ttsAudio.play();
}

// Handle Enter key press event
var messageInput = document.getElementById("messageInput");
messageInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function checkChatRequestCount() {
    const token = localStorage.getItem('token');
    fetch('https://api.sungbinlee.dev/api/chat/gpt/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    }
    })
    .then(response => response.json())
    .then(data => {
    if (data.count >= data.limit) {
        // Disable chat input if chat request count is 5 or more
        document.getElementById('messageInput').disabled = true;
        document.getElementById('messageInput').placeholder = '일일 채팅 요청 횟수를 초과했습니다.';
        document.getElementById('messageInput').style.backgroundColor = '#ddd';
        document.getElementById('sendMessageBtn').disabled = true;
    }
    })
    .catch(error => console.error('Error:', error));
}