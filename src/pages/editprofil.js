window.addEventListener("DOMContentLoaded", function () {
    // Function to handle profile editing
    function editprofil(event) {
        event.preventDefault();
        
        // Get the input values at the time of form submission
        let namevalue = document.querySelectorAll('input')[0].value;
        let uservalue = document.querySelectorAll('input')[1].value;
        let emailvalue = document.querySelectorAll('input')[2].value;
        let passvalue = document.querySelectorAll('input')[3].value;
        const token=window.localStorage.getItem('token')
        let formdata = new FormData();
        formdata.append("name", namevalue);
        formdata.append("user", uservalue);
        formdata.append("email", emailvalue);
        formdata.append("password", passvalue);
        formdata.append("_method", "put");

        let baseurl = 'https://tarmeezacademy.com/api/v1';
        
        // Making the PUT request to update the profile
        axios.post(`${baseurl}/updateProfile`, formdata, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(response => {
            console.log(response.data.token);

            

            let userauth = response.data.user.username;
            window.localStorage.setItem('username', userauth);

            let userid = response.data.user.id;
            window.localStorage.setItem('id', userid);

            let fullname = response.data.user.name;
            window.localStorage.setItem('name', fullname);

            let postnumber = response.data.user.posts_count;
            window.localStorage.setItem('postnumber', postnumber);

            let commentnumber = response.data.user.comments_count;
            window.localStorage.setItem('commentnumber', commentnumber);

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

    // Add event listener to the submit button
    document.getElementById('signin').addEventListener('click', editprofil);

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
});

