import React from "react";
import Masonry from "react-masonry-css";
import "./LookGrid.css";
import Product from "./Product";


const ProductGrid = ({ userId, photoUrls, products, breakpoints}) => {
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
          {products?.map((product, index) => (
            <Product
              key={index}
              userId={userId}
              photoUrl={product.image}
              //isSaved={savedLooks.includes(product.image)}
              product={product}
            />
          ))}
        </Masonry>
      )}
    </div>
  );
};

export default ProductGrid;