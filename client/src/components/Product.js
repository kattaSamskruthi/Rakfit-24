import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Look.css";
import { addToWishList } from "../actions/look";

const Product = ({ userId, photoUrl, product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const { wishListId } = useSelector((state) => state.look);

  const handleClick = () => {
    dispatch(addToWishList(wishListId, product));
  };

  const handleOpenProductPage = () => {
    navigate(`/item/${product._id}`);
  };

  return (
    <div>
      <div className="Look__wrapper">
        <div
          className="Look__container"
          onMouseOver={() => setShowButton(true)}
          onMouseLeave={() => setShowButton(false)}
        >
          <div onClick={handleOpenProductPage}>
            <img src={photoUrl} alt="Look" />
          </div>
          {showButton && (
            <div key={`look-btn-${photoUrl}`}>
              {/* <SaveButton userId={userId} photoUrl={photoUrl} isSaved={isSaved} /> */}
              {wishListId ? <button onClick={handleClick}>W</button> : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
