window.addEventListener('DOMContentLoaded', () => {

  // Function to fetch posts from the API
  function getPost() {
      let baseurl = 'https://tarmeezacademy.com/api/v1';

      // Making the GET request
      axios.get(`${baseurl}/posts`)
          .then(response => {
              console.log(response.data.data);

              // Display the user information
              showuser();

              // Loop through each post in the response data
              for (post of response.data.data) {
                  console.log(post.author);

                  // Call the function to build and display the post HTML
                  showpost();
              }
          })
          .catch(error => {
              console.error(error);
          });
  }

  // Call the function to fetch posts when the page loads
  getPost();

  // Function to build and display the HTML for each post
  function showpost() {
      document.getElementById('postcontainer').innerHTML += `
          <div class="custom-height bg-gray-200 mt-9 pace-y-1 rounded h-auto shadow-lg" >
              <div class="flex flex-row space-x-4 px-2 mt-3">
                  <i class="fas fa-user-circle m-2 custom-user-icon"></i>
                  <p class="font-bold text-xl mt-1">${post.author.username}</p>
              </div>
              <div class="m-5 flex items-center justify-center mb-3">
                  <img src="${post.image}" alt="Image">
              </div>
              <h6 class="m-3 text-gray-400">${post.created_at}</h6>
              <h3 class="font-bold ml-3">${post.title}</h3>
              <p class="m-2">${post.body}</p>
              <hr class="border-t-2 border-gray-300 mt-2">
              <div class="m-3">
                  <i class="fas fa-pencil-alt text-xl text-indigo-600 hover:text-indigo-950"></i>
                  <span>(${post.comments_count}) comments</span>
              </div>
          </div>
      `;
  }

  // Function to display the username from local storage
  function showuser() {
      let username = window.localStorage.getItem('username');
      document.getElementById("user").textContent = `${username}`;
  }

  // Event listener for the sign-in button to redirect to the login page and clear local storage
  document.getElementById("signin").onclick = () => {
      window.location.href = "login.html";
      window.localStorage.clear();
  }
});
