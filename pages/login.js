document.addEventListener('DOMContentLoaded', () => {
  const signinbutton = document.getElementById('signin');

  // Function to display the loading screen before redirecting to the home page
  function loader() {
    let uservalue = document.getElementById('username').value;
 
document.getElementById('divider').classList.add('errorstyle')
      // Modify the body's class to hide other content
      document.getElementById('body').classList.remove('flex');
      document.getElementById('body').classList.add('errorstyle');

      // Modify the loader's class to show the loading screen
      document.getElementById('loader').classList.remove('errorstyle');
      document.getElementById('loader').classList.add('flex', 'flex-col', 'justify-center', 'items-center');

      // Hide additional sections during loading
      document.getElementById('footer').classList.add('errorstyle');

      // Set the loader's inner HTML to include the user's name and loading animations
      document.getElementById('loader').innerHTML = `
          <div class="flex flex-col items-center space-y-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-20 h-20 text-green-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2l4-4" />
              </svg>
              <div class="text-2xl font-bold">Welcome ${uservalue}</div>
          </div>
          <div class="flex space-x-4 mt-7">
              <span class="loading loading-ball loading-xs"></span>
              <span class="loading loading-ball loading-sm"></span>
              <span class="loading loading-ball loading-md"></span>
              <span class="loading loading-ball loading-lg"></span>
          </div>
      `;
  }

  // Function to handle the login process
  function login(event) {
      event.preventDefault(); // Prevent the form from submitting and reloading the page

      const uservalue = document.getElementById('username').value;
      const passwordvalue = document.getElementById('password').value;

      // Example data to be sent in the POST request
      const postData = {
          username: uservalue,
          password: passwordvalue,
      };

      // Making the POST request
      axios.post('https://tarmeezacademy.com/api/v1/login', postData)
          .then(response => {
              console.log(response.data.token);

              // Store the authentication token in local storage
              const authtoken = response.data.token;
              window.localStorage.setItem('token', authtoken);

              // Call the loader function
              loader();

              // Redirect to the home page after a delay
              setTimeout(() => {
                  window.location.href = '/pages/home.html';
              }, 5000);
          })
          .catch(error => {
              console.error(error);
              document.getElementById('error').classList.remove('errorstyle');
              document.getElementById('contenterror').textContent = `User not found`;
          });
  }

  // Add event listener to the sign-in button
  signinbutton.addEventListener('click', login);
});

  




 


