
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch,useSelector } from "react-redux";
import "./Look.css";
import { saveLook, deleteSavedLook,addToWishList } from "../actions/look";




const SaveButton = ({ userId, photoUrl, isSaved }) => {
  const dispatch = useDispatch();

  const handleOnClick = (event) => {
    event.preventDefault();
    isSaved
      ? dispatch(deleteSavedLook({ userId, photoUrl }))
      : dispatch(saveLook({ userId, photoUrl }));
  };

  const buttonStyle = {
    backgroundColor: isSaved ? '#000' : '#FF8DA7',
    color: 'white',
  };

  return (
    <button onClick={handleOnClick} style={buttonStyle} className="save-btn">
      +
    </button>
  );
};

const Look = ({ userId, photoUrl, isSaved, post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const { wishListId } = useSelector((state) => state.look);

  const handleClick = () => {
    dispatch(addToWishList(wishListId, post));
  };

  const handleOpenLookPage = () => {
    navigate(`/look/${post._id}`);
  };
  

  return (
    <div>
      <div className="Look__wrapper">
        <div
          className="Look__container"
          onMouseOver={() => setShowButton(true)}
          onMouseLeave={() => setShowButton(false)}
        >
          <div onClick={handleOpenLookPage}>
            <img src={photoUrl} alt="Look" />
          </div>
          {showButton && (
            <div key={`look-btn-${photoUrl}`}>
              <SaveButton userId={userId} photoUrl={photoUrl} isSaved={isSaved} />
              {wishListId ? <button onClick={handleClick}>W</button> : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Look;
