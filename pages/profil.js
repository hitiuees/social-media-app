window.addEventListener('DOMContentLoaded',()=>{
    //function get the post
    
    function getPost(){
    let userid=window.localStorage.getItem('id')
   let baseurl='https://tarmeezacademy.com/api/v1'
     // Making the get request
     axios.get(`${baseurl}/users/${userid}/posts`)
     .then(response => {
         console.log(response.data.data);
         showuserdata()
    for(post of response.data.data){
        // console.log(post.body)
        // console.log('###')
        // console.log(post.author)
        // console.log(post.created_at)
        let postid=post.id
        console.log(postid)
        showpost(postid)
    }
     })
     .catch(error => {
         console.error(error);
      
     });
    
    
    }
    
    getPost()
    
    //function to build htmlpost
    function showpost(postid) {
      const postContainer = document.getElementById('postcontainer');
      
      // Append new post HTML to the container
      postContainer.innerHTML += `
      <div class="custom-height bg-gray-200 mt-9 p-4 rounded shadow-lg h-auto relative" data-aos="fade-up">
          <div class="flex items-center justify-between px-2 mt-3">
              <div class="flex items-center space-x-4">
                  <i class="fas fa-user-circle custom-user-icon"></i>
                  <p class="font-bold text-xl">${post.author.username}</p>
              </div>
              <button data-id="${postid}" class="bg-red-600 text-white font-bold py-1 px-3 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 delete-btn">
                  Delete
              </button>
          </div>
          <div class="m-5 flex items-center justify-center mb-3">
              <img src="${post.image}" alt="Image" class="w-full h-auto rounded">
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
  
    document.getElementById("signin").onclick=()=>{
        window.location.href = "login.html";
        window.localStorage.clear()
    }
    // get user from the localStorage;
function showuserdata(){
  let username=window.localStorage.getItem('username')
  document.getElementById("user").textContent=`${username}`
  let fullname=window.localStorage.getItem('name')
document.getElementById('fullname').textContent=`${fullname}`
document.getElementById("username").textContent=`${username}`
let postnumber=window.localStorage.getItem('postnumber')
let commentnumber=window.localStorage.getItem('postnumber')
document.getElementById('postN').textContent=`${postnumber}`
document.getElementById('commentN').textContent=`${commentnumber}`

}


//deleting button function 
    // Function to show the confirmation modal
    function showDeleteModal(postid) {
        const modal = document.getElementById('delete-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');

        // Set up event listeners for confirm and cancel buttons
        document.getElementById('confirm-delete').onclick = () => {
            // deletePost(postId); // Call your delete function here
            deletepost(postid)
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            
        };
    
        document.getElementById('cancel-delete').onclick = () => {
            modal.classList.add('hidden');
        };
    }
    document.getElementById('postcontainer').addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('delete-btn')) {
            const postid = e.target.getAttribute('data-id');
            showDeleteModal(postid);
        }
    });

// function of caling endpoint for delete
function deletepost(postid){
    let baseurl='https://tarmeezacademy.com/api/v1'
    const token=window.localStorage.getItem('token')
      // Making the get request
      axios.delete(`${baseurl}/posts/${postid}`,{
        headers: {
            'Authorization': `Bearer ${token}`,
          
        }})
      .then(response => {
          console.log(response);
          
   alert(" post deleted")
  location.reload()
      })
      .catch(error => {
          console.error(error);
       
      });
     
     
     
      }
      

    }
)





