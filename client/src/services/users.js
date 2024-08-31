import axios from "axios";


export const instance = axios.create({
  baseURL:`${process.env.REACT_APP_BASE_URL}/api/users`,
});

export const signup = async (userData) => {
  return await instance.post("/signup", userData);
};

export const login = async (userData) => {
  return await instance.post("/login", userData);
};

export const getProfile = async (userId) => {
  return await instance.get(`/${userId}`);
};
export const getWishListItems = async (wishListId) => {
  return await instance.get(`/wishlist/${wishListId}/items`);
};

export const saveLook = async ({ userId, photoUrl }) => {
  return await instance.put(`/${userId}/save-look`, { photoUrl });
};

export const deleteSavedLook = async ({ userId, photoUrl }) => {
  return await instance.put(`/${userId}/delete-look`, { photoUrl });
};

export const createWishList = async () => {
  return await instance.post(`/create-wishlist`);
};
export const joinWishList = async (wishlistId) => {
  return await instance.post(`/join-wishlist`,{wishlistId});
};

export const addToWishList = async (wishListId,post) => {
  return await instance.post(`/wishlist/${wishListId}/item`,post);
};





