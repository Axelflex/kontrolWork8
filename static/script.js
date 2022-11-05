const input = document.getElementsByClassName('input')[0];
const btn = document.getElementsByClassName('button')[0];
const drinksContainer = document.getElementsByClassName('drinks')[0];

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";






const renderPosts = (posts, users) => {
      postContainer.innerHTML = '';
      posts.forEach(async (post) => {
        const comments = await _getAllComments(post.id);
        postContainer.insertAdjacentHTML('beforeend', postTemplateString + modalTemplateString);
      });
};
   
async function renderDrinks() {
  const drinks = await _getDrinks();
  templateDrinks(drinks)
}

const drinkInfoTemplate = (drink) => {
  let template = ``
  for (let i = 1; i < 15; i++){
    let str = "strIngredient" + i
    let measure = "strMeasure" + i
    if (drink[str] != null) {
      template = template + `<p>${drink[str] + "  " + drink[measure]}</p><img src="https://www.thecocktaildb.com/images/ingredients/${drink[str]}-Small.png">`
    }
  }
  return template
}
const templateDrinks = (drinks) => {
  drinksContainer.innerHTML = '';
  drinks.forEach((drink) => {
    const template = `
      <div class = "card me-3 mb-3" style = "width: 18rem;">
        <a data-bs-toggle = "modal" data-bs-target = "#exampleModal" >
          <img src = "${drink.strDrinkThumb}"class = "img card-img-top" alt = "${drink.strDrink}">
        </a>
        <div class="card-body">
          <p class="card-text">${drink.strDrink}</p>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#drinkModal${drink.idDrink}">get info</button>
        </div>
      </div>
      `;
      const modalTemplate = `
      <div class = "modal" id = "drinkModal${drink.idDrink}" tabindex = "-1">
      <div class="modal-dialog">
      <div class="modal-content">
      <div class="modal-header">
      <h5 class="modal-title">Cocktail info</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h6>Ingredients:</h6>
        ${drinkInfoTemplate(drink)}
        <h6>Instructions:</h6>
        <p>${drink.strInstructions}</p>
      </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
      </div>
      </div>
      </div>
      `;
    drinksContainer.insertAdjacentHTML('beforeend', template + modalTemplate);
  })
}

async function _getDrinks() {
  if (input.value != '') {
    if (!isNaN(input.value)) {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${input.value}`;
      const response = await axios.get(url)
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      console.log(response.data.drinks)
      return response.data.drinks;
    } else {
      const url = BASE_URL + input.value;
      const response = await axios.get(url);
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      console.log(response.data.drinks)
      return response.data.drinks;
    }
  } else {
    alert('nothing written')
  }
  
}
window.addEventListener('DOMContentLoaded',async () => {
  const drinks = await _getDrinks();
  
})
btn.addEventListener('click', renderDrinks)





// // DECLARE VARIABLES
// const appContainer = document.getElementsByClassName('app-container')[0];
// const splashButton = document.getElementById('splashBtn');
// const addPostForm = document.getElementById('addPostForm');
// const splash = document.getElementById("splash")
// const loginForm = document.getElementById('login-form');
// const mark = document.getElementById('mark');
// const postContainer = document.getElementsByClassName('post-container')[0];
// const navbarData = document.getElementsByClassName('navbarData')[0];
// //const BASE_URL = "https://techcrunch.com/wp-json/wp/v2/posts?per_page=100&context=embed";
// const BASE_URL = "http://localhost:8080/"
// const IMG = "../img/img.png"
// const storage = localStorage;

// const posts = [];

// // const options = {
// //   mode: 'cors',
// //   headers: {
// //     'Content-Type': 'application/json',
// //     'Authorization': 'Basic ' + btoa(user.name + ':' + user.password)
// //   }
// // };

// const user = {
//   userId: 1,
//   name: 'Max',
//   email: 'max@qwe.com',
//   password: 'qwe',
//   isAuthorized: true,
// };

// const post = {
//   postId: 1,
//   userId: user.userId,
//   identity: user.email,
//   name: 'post name',
//   photo: '../img/img.png',
//   description: 'lorem',
//   likes: 12,
//   likeState: false,
//   timeOfCreation: new Date(),
// };

// const comment = {
//   commentId: 1,
//   identity: post.userId,
//   whichPost: post.postId,
//   commentText: 'lorem',
//   commentator: user.email,
//   timeOfCreation: new Date(),
// };

// const NUM_OF_POSTS = 20;


// // DECLARE FUNCTIONS

// async function _getUserEmail() {
//   const url = BASE_URL + "userByEmail?email=admin@test";
//   const response = await axios.get(url);
//   if (response.status !== 200) {
//     throw new Error(response.status);
//   }
//   return response.data.nickname;
// }

// const changeAuthor = () => {
//   user.isAuthorized = true;
// };

// function changePost(postId) {
//   for (let i = 0; i < posts.length; i++) {
//     if (posts[i].postId === postId) {
//       if (posts[i].likeState === false) {
//         _putLike(i);
//         posts[i].likeState = true;
//       } else {
//         _removeLike(i);
//         posts[i].likeState = false;
//       }
//     }
//   }
// }

// function _putLike(identifier) {
//   posts[identifier].likes = post[identifier].likes + 1;
// }

// function _removeLike(identifier) {
//   posts[identifier].likes = post[identifier].likes - 1;
// }

// const createPosts = () => {
//   // 0. Creat N ammount of posts
//   for (let i = 1; i < NUM_OF_POSTS; i++) {
//     posts.push({
//       postId: i,
//       userId: user.userId,
//       identity: user.email,
//       name: 'post name',
//       photo: '../img/img.png',
//       description: 'lorem',
//       likes: i,
//       likeState: false,
//       timeOfCreation: new Date(),
//     });
//   }
// };
// async function renderComs() {
//   const users = await _getAllUsers();
//   const pubs = await _getAllPubs();
//   renderPosts(pubs, users)
// }

// async function renderPubs() {
//   const users = await _getAllUsers();
//   const pubs = await _getAllPubs();
//   renderPosts(pubs, users)
// }

// // async function _createComment() {
// //   const url = BASE_URL + "addComment";
// //   const response = await axios.post(url);
// //   if (response.status !== 200) {
// //     throw new Error(response.status);
// //   }
// //   return response.data;
// // }

// async function _getAllUsers() {
//   const url = BASE_URL + "allUsers";
//   const response = await axios.get(url);
//   if (response.status !== 200) {
//     throw new Error(response.status);
//   }
//   return response.data;
// }
// async function _getAllComments(postId) {
//   const url = BASE_URL + `getAllComments?post_id=${postId}`;
//   const response = await axios.get(url);
//   if (response.status !== 200) {
//     throw new Error(response.status);
//   }
//   return response.data;
// }
// async function _getAllPubs() {
//   const url = BASE_URL + "allPubs";
//   const response = await axios.get(url);
//   if (response.status !== 200) {
//     throw new Error(response.status);
//   }
//   return response.data;
// }


// function loginHandler(event) {
//   event.preventDefault()
//   const form = event.target;
//   const data = new FormData(form);
//   const email = document.getElementById('loginEmail')
//   const password = document.getElementById('loginPassword')
//   let object = {};
//   data.forEach((value, key) => {
//     object[key] = value;
//   });
//   let json = JSON.stringify(object);

//   let dataUser = send(json, email.value);
//   console.log(dataUser)

//   storage.setItem(email.name, email.value)
//   storage.setItem(password.name, password.value)

//   console.log(storage)
//   renderUsername();
// }


// function send(json, email) {
//   axios.get(BASE_URL + 'isUserExist?email=' + email,
//       json, {
//         headers: {
//           "Content-Type": "application/json"
//         }
//       })
//     .then((response) => {
//       return response.data
//     })
//     .catch((error) => {
//       console.log(error);
//     })
// }
// async function renderUsername() {
//   const nickname = await _getUserEmail();
//   navbarData.innerHTML = ''
//   let template = '';
//   template += `<span>${nickname}</span> <a href="#">logout</a>`
//   navbarData.insertAdjacentHTML('beforeend', template);
// }
// function getCommentUser(userId, users) {
//   const result = users.filter((user) => user.id === userId);
//   return result[0]
// }

// function renderComments(comments, users) {
//   let template = '';
//   comments.forEach((c) => {
//     let user = getCommentUser(c.user_id, users)
//     template += `<a href="#" class="nickname">${user.nickname}</a><p class="comment">${c.commentText}</p>`
//   })
//   return template
// }
// const renderPosts = (posts, users) => {
//   postContainer.innerHTML = '';
//   posts.forEach(async (post) => {
//     const comments = await _getAllComments(post.id);
//     // 1. Create a template string for post objects
//     const postTemplateString = ` 
//     <div class="post card mb-3" style="width: 40rem;">
//       <img class="post-image card-img-top" src="${post.photo}" alt="...">
//       <span class="h1 mx-2 text-danger imgHeart">
//         <i class="bi bi-heart-fill"></i>
//       </span>
//       <div class="post-body">
//         <div class = "card-body d-flex">
//           <span class = "h1 mx-2 text-danger" >
//             <i class = "like bi bi-heart"> </i> 
//           </span>
//           <span class = "h1 mx-2" data-bs-toggle = "modal" data-bs-target = "#commentModal${post.id}">
//             <i class = "bi bi-chat"></i>
//           </span>
//           <span class = "h1 mx-2 ms-auto">
//             <i class = "bi bi-bookmark"></i>
//           </span> 
//         </div>
//         <div class="comment-body">
//           <div class="post-description"> ${post.description} </div>
//           <p class = "comment-header">Comments:</p>
//           <div class="comments">
//             ${renderComments(comments, users)} 
//           </div>
//         </div>
//       </div>
//     </div>`;

//     const modalTemplateString = `
//         <div class="modal fade" id="commentModal${post.id}" tabindex="-1" aria-labelledby="commentModalLabel${post.id}" aria-hidden="true">
//             <div class="modal-dialog">
//                 <form class="modal-content" method="post">
//                     <div class="modal-header">
//                         <h1 class="modal-title fs-5" id="commentModalLabel${post.id}">Write new comment for post ID ${post.id}</h1>
//                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                     </div>
//                     <div class="modal-body">
//                         <div class="d-flex flex-column" id="comment-form">
//                             <textarea placeholder="description" name="description"></textarea>
//                             <input type="hidden" name="userId"  value="1">
//                             <input type="hidden" name="postId"  value="1">
//                         </div>
//                     </div>
//                     <div class="modal-footer">
//                         <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal">Comment</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//         `;

//     postContainer.insertAdjacentHTML('beforeend', postTemplateString + modalTemplateString);
//   });
// };

// function postAddHandler(event) {
//   event.preventDefault()
//   let valid = false;
//   var currentdate = new Date();
//   var datetime = "Last Sync: " + currentdate.getDate() + "/" +
//     (currentdate.getMonth() + 1) + "/" +
//     currentdate.getFullYear() + " @ " +
//     currentdate.getHours() + ":" +
//     currentdate.getMinutes() + ":" +
//     currentdate.getSeconds();
//   const data = {
//     description: addPostForm.description.value,
//     photo: regForm.photo.value,
//     datetime: datetime
//   }
//   console.log(data)

//   if (data.password === data.password2) valid = true;

//   if (valid) {
//     const url = BASE_URL + 'addUser';
//     const json = JSON.stringify(data)
//     axios.post(url, data, {
//         'content-type': 'application/json',
//       })
//       .then((response) => {
//         if (response.status === 200) {
//           window.location.replace('index.html')
//         }
//       })

//   } else {
//     alert('passwords do not match')
//   }
// }
// const addPost = (e) => {
//   e.preventDefault();

// };


// const toggleLike = (elem) => {
//   const parent = elem.closest('.post');

//   const likeOnImg = parent.getElementsByClassName('imgHeart')[0];
//   const likeIcon = parent.getElementsByClassName('like')[0];

//   likeOnImg.classList.toggle('active');

//   likeIcon.classList.toggle('bi-heart-fill');
//   likeIcon.classList.toggle('bi-heart');
// };


// // EVENT LISTENERS
// const gg = document.querySelector('body');
// gg.addEventListener('submit', (e) => {
//   if (e.target.matches('#post-form')) {
//     const postForm = document.getElementsByClassName('post-form')
//     postForm.addEventListener('submit', postHandler);
//   }
// })
// //postForm.addEventListener('submit', postHandler);

// loginForm.addEventListener('submit', loginHandler);


// addPostForm.addEventListener('submit', addPost);


// splashButton.addEventListener('click', () => {
//   splash.classList.remove('active');
// });

// //window.addEventListener('DOMContentLoaded', createPosts);
// // window.addEventListener('DOMContentLoaded', renderPosts);
// window.addEventListener('DOMContentLoaded', renderPubs);

// appContainer.addEventListener('click', (e) => {
//   if (e.target.classList.contains('like')) {
//     toggleLike(e.target);
//     e.preventDefault();
//   }
// });

// appContainer.addEventListener('dblclick', (e) => {
//   if (e.target.classList.contains('post-image')) {
//     toggleLike(e.target);
//   }
// });