
// import React, { useState } from 'react';
// import "./LookPost.css";

// const LookPost = ({ post, user }) => {
//   const [commentsExpanded, setCommentsExpanded] = useState(false);

//   const toggleComments = () => {
//     setCommentsExpanded(!commentsExpanded);
//   };

//   return (
//     <div className="Look_post_wrapper">
//       <div className="Look_wrapper">
//         <div className="Look_container">
//           <div className="img">
//             {/* <img src={`${photoUrl}&w=236`} alt="" /> */}
//           </div>
//           <button className="save-btn">+</button>
//         </div>
//       </div>
      
//       <div className="user_info">
//         <div className="profile_pic">
//           {/* <img src="profile_picture_url" alt="Profile" /> */}
//         </div>
//         <div className="username">Jane Smith</div>
//       </div>

//       <h2 className="caption">Caption....</h2>
//       <div className="tags_wrapper">
//         <div className="tag">Summer</div>
//         <div className="tag">Boho</div>
//         <div className="tag">cute</div>
//         <div className="tag">Schiffli</div>
//       </div>
//       <h3 className="caption">Comments</h3>  

//       <input className="comment_input" type="text" placeholder="Add a comment..." />
//       <div className="comment_section">
//         <button className="toggle-comments-btn" onClick={toggleComments}>
//           {commentsExpanded ? 'Hide Comments' : 'Show Comments'}
//         </button>
//         {commentsExpanded && (
//           <div className="comments">
//             <div className="comment">
//               <div className="comment_user_info">
//                 <div className="comment_user_pic">
//                   {/* <img src="user_pic_url" alt="User" /> */}
//                 </div> 
//                 <div className="comment_user">User</div>
//               </div>
//               <div className="comment_content">Lorem ipsum dolor sit amet, consectetur adipiscing...</div>
//             </div>
//           </div>
//         )}
        
//       </div>
//     </div>
//   );
// };

// export default LookPost;
