import * as userService from "../services/users";
import * as productService from "../services/product";

export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const FETCH_PRODUCT_BY_ID = "FETCH_PRODUCT_BY_ID";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const SET_SHOP = "SET_SHOP";

export const createProduct = (productData) => async (dispatch) => {
    try {
      const response = await productService.createProduct(productData);
      dispatch({
        type: CREATE_PRODUCT,
        product: response.data,
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };


  export const getProductById = (productId) => async (dispatch) => {
    try {
      const response = await productService.getProductById(productId);
      dispatch({
        type: FETCH_PRODUCT_BY_ID,
        product: response.data,
      });
    } catch (error) {
      console.error("Error fetching product by id:", error);
      dispatch({
        type: FETCH_PRODUCT_BY_ID,
        product: null,
      });
    }
  };


  export const getProduct = () => async (dispatch) => {
    try {
      const response = await productService.getProduct();
      console.log(response)
      dispatch({
        type: FETCH_PRODUCTS,
        products: response.data,
      });
      dispatch({
        type: SET_SHOP,
        photoUrls: response.data.map(product => product.image),
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };