import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSavedLooks, searchLooks } from "../actions/look";
import NavBar from "../components/NavBar";
import LookGrid from "../components/LookGrid";

const Search = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector((state) => state.session.user);
  const userId = user.id;

  useEffect(() => {
    dispatch(getSavedLooks({ userId, setAsFeed: false }));
    dispatch(searchLooks(params.query));
  }, [dispatch, params.query, userId]);

  const { feed, saved } = useSelector((state) => state.look);

  return (
    <div>
      <NavBar query={params.query} />
      <LookGrid userId={userId} photoUrls={feed} savedLooks={saved} />
    </div>
  );
};

export default Search;
