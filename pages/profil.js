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
        console.log(post.author)
        // console.log(post.created_at)
        // console.log(post.id)
        showpost()
    }
     })
     .catch(error => {
         console.error(error);
      
     });
    
    
    }
    
    getPost()
    
    //function to build htmlpost
    function showpost(){
    document.getElementById('postcontainer').innerHTML+=`<div class="custom-height bg-gray-200 mt-9 pace-y-1 rounded  shadow-lg h-auto " data-aos="fade-up">
          <div class=" flex space-x-4 px-2 mt-3">
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
          </div>`
    
        
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
     })