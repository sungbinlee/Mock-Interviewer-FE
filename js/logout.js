function logout() {
    const token = localStorage.getItem('token');
  
    // Send the logout request to the backend API with the token in the headers
    fetch('http://127.0.0.1:8000/api/user/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}` // Include the token in the headers
      }
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message); // Show logout success message
      // Remove the token from local storage and redirect to login page
      localStorage.removeItem('token');
      window.location.href = 'login.html';
    })
    .catch(error => console.error('Error:', error));
  }