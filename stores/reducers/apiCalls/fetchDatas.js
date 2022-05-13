// import {
//   fetchPostsPending,
//   fetchPostsSuccess,
// } from '../../actions/usserSignUpDate';

// const fetchPoststs = async () => {
//   return dispatch => {
//     dispatch(fetchPostsPending());
//     fetch('https://exampleapi.com/products')
//       // const urlPosts = baseUrl2 + `/posts?page=${currentPage}`;
//       .then(res => res.json())
//       .then(res => {
//         if (res.error) {
//           throw res.error;
//         }
//         dispatch(fetchPostsSuccess(res.posts));
//         return res.posts;
//       })
//       .catch(error => {
//         console.log('error', error);
//       });
//   };
// };

// export default fetchPoststs;
