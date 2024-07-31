document.addEventListener('DOMContentLoaded', () => {
    const signinbutton = document.getElementById('signin');
  
    // Function to check data fields in the database
    function login(event) {
      event.preventDefault(); // Prevent the form from submitting and reloading the page
  
      const uservalue = document.getElementById('username').value;
      const passwordvalue = document.getElementById('password').value;
  
      console.log('Username:', uservalue);
      console.log('Password:', passwordvalue);
  
      // Example data to be sent in the POST request
      const postData = {
        username: uservalue,
        password: passwordvalue,
      };
  
      // Making the POST request
      axios.post('https://tarmeezacademy.com/api/v1/login', postData)
        .then(response => {
          console.log(response.data.token);
          const authtoken = response.data.token;
          window.localStorage.setItem('token', authtoken);
            window.location.href = '/pages/home.html'; // Redirect to home page
      
        })
        .catch(error => {
          console.error(error);
          alert('User not found (404)');
        });
    }
  
    // Add event listener to the sign-in button
    signinbutton.addEventListener('click', login);
  });
  




 


