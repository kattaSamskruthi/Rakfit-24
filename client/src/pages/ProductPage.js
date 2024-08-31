import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar.js';
import ProductGrid from '../components/ProductGrid.js';
import { getProduct, getProductById } from "../actions/product.js";
import "../components/LookPage.css";

const ProductPage = () => {
    const [commentsExpanded, setCommentsExpanded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([
        { text: "The Comment", user: "User", userInitial: "U" }
    ]);

    const toggleComments = () => {
        setCommentsExpanded(!commentsExpanded);
    };

    const { productId } = useParams();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);
    const userId = user ? user.id : null; 
    const item = useSelector((state) => state.product.selectedProduct);
    const { shop, product } = useSelector((state) => state.look);

    useEffect(() => {
        const fetchData = async () => {
            
            await dispatch(getProduct());
            await dispatch(getProductById(productId));
            setLoading(false);
        };
        fetchData();
    }, [dispatch, userId, productId]);

    const handleAddComment = () => {
        if (commentText.trim()) {
            setComments([
                ...comments,
                { text: commentText, user: user.name, userInitial: user.name.charAt(0).toUpperCase() }
            ]);
            setCommentText("");
            setCommentsExpanded(true); 
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!item) {
        return <div>Product not found</div>;
    }

    const userInitials = item.user && item.user.initials ? item.user.initials : 'U';
    const userName = item.user && item.user.name ? item.user.name : 'Unknown';
    const productTags = item.trendTags || [];

    const breakpoints = {
        default: 4,
        1100: 2,
        700: 1,
        500: 1,
    };

    return (
        <div>
            <NavBar />
            <div className='wrapper'>
                <div className='post__wrapper'>
                    <div className="Look_post_wrapper">
                        <div className="Look_wrapper">
                            <div className="Look_container">
                                
                                    <div className="img__wrapper">
                                        <img src={item.image} alt={item.caption} className='img'/>
                                    </div>
                                
                                {/* <button className="save-btn">+</button> */}
                            </div>
                        </div>

                        <div className="user_info">
                            <div className="vatar">{userInitials}</div>
                            <div className="username"><h1>{userName}</h1></div>
                        </div>

                        <h2 className="caption">{item.caption}</h2>

                        <div className="tags_wrapper">
                            {productTags.map((tag, index) => (
                                <div key={index} className="tag">{tag}</div>
                            ))}
                        </div>

                        <div>
                            <div>{item.productPrice}</div> 
                            <button>Add to Cart</button>
                        </div>

                        <div className='comment_h'>
                            <h3 className="com">Comments</h3>
                            <button className="toggle-comments-btn" onClick={toggleComments}>
                                {commentsExpanded ? 
                                <span className="material-symbols-outlined">arrow_drop_down</span> : <span className="material-symbols-outlined">arrow_drop_up</span>}
                            </button>
                        </div>
                        
                        <div className="comment_input">
                            <input 
                                className="ct_input" 
                                type="text" 
                                placeholder="Add a comment..." 
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                            <button className='comment__btn' onClick={handleAddComment}>
                                <span className="material-symbols-outlined">arrow_upward</span>
                            </button>
                        </div>
                        
                        <div className="comment_section">
                            {commentsExpanded && comments.map((comment, index) => (
                                <div className="comments" key={index}>
                                    <div className="comment">
                                        <div className="comment_user_info">
                                            <div className="comment_user_pic">{comment.userInitial}</div>
                                            <div className="comment_user">{comment.user}</div>
                                        </div>
                                        <div className="comment_content">{comment.text}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='grid__warpper'>
                    <ProductGrid product={product} userId={userId} photoUrls={shop}  breakpoints={breakpoints} />
                </div>
            </div>
        </div>
    );
}

export default ProductPage;























