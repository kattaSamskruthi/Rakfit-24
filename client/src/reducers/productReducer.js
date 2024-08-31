
import {
  SET_SHOP,
  CREATE_PRODUCT,
  FETCH_PRODUCTS,
  FETCH_PRODUCT_BY_ID
  
} from "../actions/product";

const INITIAL_STATE = {
  shop: [],
  product: [],
  selectedProduct: null,
};


const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case SET_SHOP:
      return {
        ...state,
        shop: action.photoUrls,
      };

    case CREATE_PRODUCT:
      console.log('Created product:', action.product);
      return {
        ...state,
        shop: [action.product.image, ...state.shop],
      };
    case FETCH_PRODUCTS:
      return {
        ...state,
        product: action.products,
      };
    case FETCH_PRODUCT_BY_ID:
      return {
        ...state,
        selectedProduct: action.product,
      };
    default:
      return state;
  }
};


export default productReducer;
