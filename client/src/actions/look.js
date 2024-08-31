
import * as unsplashService from "../services/unsplash";
import * as userService from "../services/users";
import * as postService from "../services/post";

export const FETCH_SAVED_LOOKS = "FETCH_SAVED_LOOKS";
export const SET_FEED = "SET_FEED";
export const SAVE_LOOK = "SAVE_LOOK";
export const DELETE_SAVED_LOOK = "DELETE_SAVED_LOOK";
export const CREATE_POST = "CREATE_POST";
export const FETCH_POSTS = "FETCH_POSTS";
export const CREATE_WISHLIST= "CREATE_WISHLIST";
export const FETCH_WISHLIST= "FETCH_WISHLIST";
export const JOIN_WISHLIST= "JOIN_WISHLIST";
export const FETCH_POST_BY_ID = "FETCH_POST_BY_ID";

export const getPostById = (postId) => async (dispatch) => {
  try {
    const response = await postService.getPostById(postId);
    dispatch({
      type: FETCH_POST_BY_ID,
      post: response.data,
    });
  } catch (error) {
    console.error("Error fetching post by id:", error);
    dispatch({
      type: FETCH_POST_BY_ID,
      post: null,
    });
  }
};



export const getSavedLooks =
  ({ userId, setAsFeed }) =>
  async (dispatch) => {
    const response = await userService.getProfile(userId);
    dispatch({
      type: FETCH_SAVED_LOOKS,
      photoUrls: response.data.savedLooks,
    });
    if (setAsFeed) {
      dispatch({
        type: SET_FEED,
        photoUrls: response.data.savedLooks,
      });
    }
  };

  

  export const getWishListItems =
  (wishListId) =>
  async (dispatch) => {
    const response = await userService.getWishListItems(wishListId);
    dispatch({
      type: FETCH_WISHLIST,
      wishListItems: response.data,
    });

  };

export const getPosts = () => async (dispatch) => {
  try {
    const response = await postService.getPosts();
    dispatch({
      type: FETCH_POSTS,
      posts: response.data,
    });
    dispatch({
      type: SET_FEED,
      photoUrls: response.data.map(post => post.image),
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const searchLooks = (query) => async (dispatch) => {
  const response = await unsplashService.search({ query, per_page: 30 });
  const photoUrls = response.data.results.map((photo) => photo.urls.raw);
  dispatch({
    type: SET_FEED,
    photoUrls: photoUrls,
  });
};

export const saveLook = ({ userId, photoUrl }) => async (dispatch) => {
  try {
    const response = await userService.saveLook({ userId, photoUrl });
    console.log('Save Look Response:', response);
    dispatch({
      type: SAVE_LOOK,
      photoUrl: photoUrl,
    });
  } catch (error) {
    console.error('Error saving look:', error);
  }
};

export const deleteSavedLook = ({ userId, photoUrl }) => async (dispatch) => {
  try {
    const response = await userService.deleteSavedLook({ userId, photoUrl });
    console.log('Delete Look Response:', response);
    dispatch({
      type: DELETE_SAVED_LOOK,
      photoUrl: photoUrl,
    });
  } catch (error) {
    console.error('Error deleting look:', error);
  }
};


export const createPost = (postData) => async (dispatch) => {
  try {
    const response = await postService.createPost(postData);
    dispatch({
      type: CREATE_POST,
      post: response.data,
    });
  } catch (error) {
    console.error("Error creating post:", error);
  }
};

export const createWishList = () => async (dispatch) => {
  try {
    const response = await userService.createWishList();
    dispatch({
      type: CREATE_WISHLIST,
      wishlist: response.data,
    });
  } catch (error) {
    console.error("Error creating post:", error);
  }
};

export const joinWishList = (id) => async (dispatch) => {
  try {
    // const response = await userService.joinWishList(id);
    dispatch({
      type: JOIN_WISHLIST,
      wishlistId: id,
    });
  } catch (error) {
    console.error("Error creating post:", error);
  }
};
export const addToWishList = (wishListId,post) => async (dispatch) => {
  try {
    const response = await userService.addToWishList(wishListId,post);
    dispatch({
      type: CREATE_WISHLIST,
      wishlist: response.data,
    });
  } catch (error) {
    console.error("Error creating post:", error);
  }
};
