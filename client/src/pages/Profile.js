import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getSavedLooks } from "../actions/look";
import NavBar from "../components/NavBar";
import LookGrid from "../components/LookGrid";
import ProfileHeader from "../components/ProfileHeader";
import "../components/ProfileHeader.css";
import SavedLookGrid from "../components/SaveLookGrid";
import Tooltip from '@mui/material/Tooltip'; // Import Tooltip
import ProductGrid from "../components/ProductGrid"; // Import ProductGrid

const Profile = () => {
  const [view, setView] = useState("saved");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const userId = user.id;

  const feed = useSelector((state) => state.look.feed) || [];
  const saved = useSelector((state) => state.look.saved) || [];
  const posts = useSelector((state) => state.look.posts) || [];
  const state = useSelector((state) => state)||[];

  useEffect(() => {
    if (userId) {
      dispatch(getSavedLooks({ userId, setAsFeed: true }));
    }
  }, [dispatch, userId, view]);

  const breakpoints = {
    default: 5,
    1200: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div>
      <NavBar />
      <ProfileHeader user={user} />

      <div>
        <Tooltip title="View your lookbook" arrow>
          <button
            style={{ cursor: 'pointer' }}
            className={view === "lookbook" ? "active_view__btn" : "view__btn"}
            onClick={() => {
              setView("lookbook");
              dispatch(getPosts());
            }}
          >
            Look Book
          </button>
        </Tooltip>

        <Tooltip title="View your saved favorites" arrow>
          <button
            style={{ cursor: 'pointer' }}
            className={view === "saved" ? "active_view__btn" : "view__btn"}
            onClick={() => {
              setView("saved");
            }}
          >
            Favorites
          </button>
        </Tooltip>

        <Tooltip title="View your Store" arrow>
          <button
            style={{ cursor: 'pointer' }}
            className={view === "store" ? "active_view__btn" : "view__btn"}
            onClick={() => {
              setView("store");
            }}
          >
            Store
          </button>
        </Tooltip>
      </div>

      {view === "saved" ? (
        feed.length > 0 ? (
          <SavedLookGrid userId={userId} photoUrls={feed} savedLooks={saved} />
        ) : (
          <h3>No Looks Saved Yet.</h3>
        )
      ) : view === "lookbook" ? (
        feed.length > 0 ? (
          <LookGrid posts={posts} userId={userId} photoUrls={feed} savedLooks={saved} breakpoints={breakpoints} />
        ) : (
          <h3>No Looks Created Yet.</h3>
        )
      ) : view === "store" ? (
        state.length > 0 ? (
          <ProductGrid products={state.product.product} userId={userId} photoUrls={state.product.shop} breakpoints={breakpoints} />
        ) : (
          <h3>Nothing in the store.</h3>
        )
      ) : null}

    </div>
  );
};

export default Profile;
