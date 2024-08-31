import React from "react";
import Masonry from "react-masonry-css";
import "./LookGrid.css";
import Look from "./Look";

const SavedLookGrid = ({ userId, photoUrls, savedLooks }) => {
  const breakpoints = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="look-grid-container">
      {photoUrls && (
        <Masonry
          breakpointCols={breakpoints}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {photoUrls.map((photoUrl, index) => (
            <Look
              key={index}
              userId={userId}
              photoUrl={photoUrl}
              isSaved={savedLooks.includes(photoUrl)}
            />
          ))}
        </Masonry>
      )}
    </div>
  );
};

export default SavedLookGrid;