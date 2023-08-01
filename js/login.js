document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Send login data to the backend API using Fetch API
    fetch('http://127.0.0.1:8000/api/user/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => {
      if (response.status === 200) {
        // Successful login, store the token in local storage
        response.json().then(data => {
            localStorage.setItem('token', data.Token);
          // Redirect to the chat page
            window.location.href = 'index.html';
        });
      } else if (response.status === 400) {
        // Bad request, show error message from the server
        response.json().then(data => {
          alert(data.error);
        });
      } else if (response.status === 401) {
        // Unauthorized, show error message
        alert('Invalid credentials. Please try again.');
      } else {
        // Handle other error codes here if needed
        alert('An error occurred. Please try again later.');
      }
    })
    .catch(error => console.error('Error:', error));
  });