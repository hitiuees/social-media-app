// Function to handle the registration process
function register(event) {
  // Get the input values at the time of form submission
  let namevalue = document.querySelectorAll('input')[0].value;
  let uservalue = document.querySelectorAll('input')[1].value;
  let emailvalue = document.querySelectorAll('input')[2].value;
  let passvalue = document.querySelectorAll('input')[3].value;

  // Create the body data for the POST request
  let bodydata = {
      name: namevalue,
      username: uservalue,
      email: emailvalue,
      password: passvalue,
  };

  // Make the POST request to register the user
  axios.post('https://tarmeezacademy.com/api/v1/register', bodydata)
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
          }, 6000);
      })
      .catch(error => {
          console.log(error);

          // Display error message
          document.getElementById('error').classList.remove('errorstyle');
          document.getElementById('contenterror').textContent = `${error.response.data.message}`;
          document.getElementById('contenterror').classList.add('mb-6');
      });
}

// Function to check the validity of the form inputs
function checkvalidity(event) {
  event.preventDefault();

  // Declare variables for the input values
  let inputs = document.querySelectorAll('input');
  let uservalue = inputs[1].value;
  let emailvalue = inputs[2].value;
  let passvalue = inputs[3].value;
  let confirmatiopassvalue = inputs[4].value;

  // Loop through the inputs to check for empty values
  for (let i = 0; i < 5; i++) {
      if (inputs[i].value === "") {
          inputs[i].style.border = '1px solid red';
          document.getElementById('error').classList.remove('errorstyle');
          return; // Exit the function if any input is empty
      }
  }

  // Validate email and username
  const emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
  const usernamePattern = /^[a-zA-Z0-9._]+$/;

  if (!emailvalue.match(emailPattern) || !uservalue.match(usernamePattern)) {
      document.getElementById('error').classList.remove('errorstyle');
      document.getElementById('contenterror').textContent = 'Invalid email or username';
      inputs[1].style.border = '1px solid red';
      inputs[2].style.border = '1px solid red';
      return; // Exit the function if email or username is invalid
  }

  // Validate password and confirmation match
  if (passvalue.length < 8 || passvalue !== confirmatiopassvalue) {
      document.getElementById('error').classList.remove('errorstyle');
      document.getElementById('contenterror').textContent = 'Invalid password or passwords do not match';
      inputs[3].style.border = '1px solid red';
      inputs[4].style.border = '1px solid red';
      inputs[1].style.border = '';
      inputs[2].style.border = '';
      return; // Exit the function if password is invalid or doesn't match
  }

  // If all validations pass, proceed with registration
  register(event);
}

// Attach the event listener for the signup button
document.getElementById('signup').addEventListener('click', checkvalidity);

// Function to display the loading screen before redirecting to the home page
function loader() {
  // Get the user's full name from the input field
  let fullname = document.querySelectorAll('input')[0].value;

  // Modify the body's class to hide other content
  document.getElementById('body').classList.remove('flex');
  document.getElementById('body').classList.add('errorstyle');

  // Modify the loader's class to show the loading screen
  document.getElementById('loader').classList.remove('errorstyle');
  document.getElementById('loader').classList.add('flex', 'flex-col', 'justify-center', 'items-center');

  // Hide additional sections during loading
  document.getElementById('need').classList.add('errorstyle');
  document.getElementById('footer').classList.add('errorstyle');

  // Set the loader's inner HTML to include the user's name and loading animations
  document.getElementById('loader').innerHTML = `
      <div class="flex flex-col items-center space-y-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-20 h-20 text-green-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2l4-4" />
          </svg>
          <div class="text-2xl font-bold">Welcome ${fullname}</div>
      </div>
      <div class="flex space-x-4 mt-7">
          <span class="loading loading-ball loading-xs"></span>
          <span class="loading loading-ball loading-sm"></span>
          <span class="loading loading-ball loading-md"></span>
          <span class="loading loading-ball loading-lg"></span>
      </div>
  `;
}





