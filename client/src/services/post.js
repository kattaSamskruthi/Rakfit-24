import axios from "axios";
export const instance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/api/post`,
  });

  export const createPost = async (postData) => {
    return await instance.post("/create-post", postData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }});
  };

  export const getPosts = async () => {
    return await instance.get("/get-posts");
  };

  export const getPostById = async (postId) => {
    return await instance.get(`/get-post-by-id/${postId}`);
  };
  
 