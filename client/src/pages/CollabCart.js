

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSavedLooks } from "../actions/look";
import Collaborators from '../components/Collaborators'
import NavBar from '../components/NavBar'
import LookGrid from '../components/LookGrid'
import { createWishList,getWishListItems,joinWishList } from "../actions/look";
import "../components/CollabCart.css"


const CollabCart = () => {

  const [view, setView] = useState("saved");
  const [id,setId]=useState("")
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);


  const userId = user.id;
  const { feed=[], saved=[], created = [],wishListId ,wishlist} = useSelector((state) => state.look);


  const handleCreateWishList = ()=>{
    dispatch(createWishList());

  }

  const handleJoinWishList = () =>{
    dispatch(joinWishList(id));
  }

  useEffect(()=>{
    if(wishListId){
      console.log(dispatch)
      dispatch(getWishListItems(wishListId))
    }
  },[wishListId])

  useEffect(() => {
    if (userId) {
      dispatch(getSavedLooks({ userId, setAsFeed: true }));
    }
  }, [dispatch, userId]);

  console.log(wishListId)
  console.log("this is wishlist")

  const breakpoints = {
    default: 5,
    1200: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div>
        <NavBar/>
        <Collaborators wishListId={wishListId}/>
        <div className="cart__wrapper">
          {
            !wishListId? <div>
                  <button className="create__btn" onClick={handleCreateWishList}>Create CollabCart</button>
                  <br></br>
                  <h3 className="text">Or</h3>
                  <div>
                    <h1 className=" heading">JOIN CollabCart</h1>
                  <input
                    className="id__input"
                    type="text"
                    placeholder="Enter CollabCart ID"
                    onChange={(e)=>setId(e.target.value)}
                  />
                  <button className="join__btn" onClick={handleJoinWishList}>Join CollabCart</button>
                </div>
              </div>: 
              <div>
              {wishlist.length > 0 ? (
          <LookGrid userId={userId} posts={wishlist} photoUrls={feed} savedLooks={saved} breakpoints={breakpoints} />
        ) : (
          <h3>No Items.</h3>
        )}
        </div>
          }
        </div>
    </div>
  )
}

export default CollabCart






  


