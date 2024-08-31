import axios from "axios";
export const instance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/api/product`,
  });

  export const createProduct = async (productData) => {
    return await instance.post("/create-product", productData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }});
  };  
  
  export const getProduct = async () => {
    return await instance.get("/get-products");
  };

  export const getProductById = async (productId) => {
    return await instance.get(`/get-product-by-id/${productId}`);
  };
  
 