import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSavedLooks, getPosts } from "../actions/look";
import NavBar from "../components/NavBar";
import LookGrid from "../components/LookGrid";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const userId = user.id;

  useEffect(() => {
    dispatch(getSavedLooks({ userId, setAsFeed: false }));
    dispatch(getPosts());
    
  }, [dispatch, userId]);

  const breakpoints = {
    default: 5,
    1200: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const { feed, saved,posts } = useSelector((state) => state.look);

  return (
    <div>
      <NavBar />
      
      <LookGrid posts={posts} userId={userId} photoUrls={feed} savedLooks={saved} breakpoints={breakpoints} />
    </div>
  );
};

export default Home;
