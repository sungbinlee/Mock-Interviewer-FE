function logout() {
    const token = localStorage.getItem('token');
  
    // Send the logout request to the backend API with the token in the headers
    fetch('http://ec2-3-36-70-123.ap-northeast-2.compute.amazonaws.com/api/user/logout/', {
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