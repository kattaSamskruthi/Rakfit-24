import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar.js';
import LookGrid from '../components/LookGrid.js';
import { getSavedLooks, getPosts, getPostById } from "../actions/look";
import "../components/LookPage.css";

const LookPage = () => {
    const [commentsExpanded, setCommentsExpanded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([
        { text: "The Comment", user: "User", userInitial: "U" }
    ]);

    const toggleComments = () => {
        setCommentsExpanded(!commentsExpanded);
    };

    const { postId } = useParams();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);
    const userId = user ? user.id : null; 
    const post = useSelector((state) => state.look.selectedPost);
    const { feed, saved, posts } = useSelector((state) => state.look);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getSavedLooks({ userId, setAsFeed: false }));
            await dispatch(getPosts());
            await dispatch(getPostById(postId));
            setLoading(false);
        };
        fetchData();
    }, [dispatch, userId, postId]);

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

    if (!post) {
        return <div>Post not found</div>;
    }

    const userInitials = post.user && post.user.initials ? post.user.initials : 'U';
    const userName = post.user && post.user.name ? post.user.name : 'Unknown';
    const postTags = post.trendTags || [];

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
                                <a href={post.productLink} target="_blank" rel="noopener noreferrer" >
                                    <div className="img__wrapper">
                                        <img src={post.image} alt={post.caption} className='img'/>
                                    </div>
                                </a>
                                <button className="save-btn">+</button>
                            </div>
                        </div>

                        <div className="user_info">
                            <div className="vatar">{userInitials}</div>
                            <div className="username"><h1>{userName}</h1></div>
                        </div>

                        <h2 className="caption">{post.caption}</h2>
                        {/* <div className="tags_wrapper">
                            <div className="tag">Summer</div>
                            <div className="tag">Boho</div>
                            <div className="tag">cute</div>
                            <div className="tag">Schiffli</div>
                        </div> */}
                        {/* Display tags dynamically */}
                        <div className="tags_wrapper">
                            {postTags.map((tag, index) => (
                                <div key={index} className="tag">{tag}</div>
                            ))}
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
                    <LookGrid posts={posts} userId={userId} photoUrls={feed}  breakpoints={breakpoints} />
                </div>
            </div>
        </div>
    );
}

export default LookPage;























