import React from "react";
import Masonry from "react-masonry-css";
import "./LookGrid.css";
import Look from "./Look";

const LookGrid = ({ userId, photoUrls, savedLooks ,posts, breakpoints}) => {
  // const breakpoints = {
  //   default: 5,
  //   1300: 4,
  //   1100: 3,
  //   700: 2,
  //   500: 1,
  // };

  return (
    <div className="look-grid-container">
      {photoUrls && (
        <Masonry
          breakpointCols={breakpoints}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {posts?.map((post, index) => (
            <Look
              key={index}
              userId={userId}
              photoUrl={post.image}
              isSaved={savedLooks.includes(post.image)}
              post={post}
            />
          ))}
        </Masonry>
      )}
    </div>
  );
};

export default LookGrid;
