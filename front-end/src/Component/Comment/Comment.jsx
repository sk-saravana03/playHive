import React, { useState } from 'react';
import "./Comment.css";
import Displaycommment from './Displaycommment';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { postcomment } from '../../action/comment';

const Comment = ({ videoid }) => {
    const dispatch = useDispatch();
    const [commenttext, setcommentext] = useState("");
    const currentuser = useSelector((state) => state.currentuserreducer);
    const commentlist = useSelector((state) => state.commentreducer);

    const handleonsubmit = (e) => {
        e.preventDefault();
        if (currentuser) {
            if (!commenttext) {
                alert("Please type your comment!");
            } else {
                dispatch(postcomment({
                    videoid: videoid,
                    userid: currentuser?.result._id,
                    commentbody: commenttext,
                    usercommented: currentuser?.result.name
                }));
                setcommentext("");
            }
        } else {
            alert("Please login to comment");
        }
    };

    const clearComment = () =>
    {
        setcommentext('');
    }

    // Filter comments for the specific video
    const videoComments = commentlist?.data?.filter((q) => videoid === q?.videoid) || [];

    return (
        <>
            <form className='comments_sub_form_comments' onSubmit={handleonsubmit}>
                <input
                    type="text"
                    onChange={(e) => setcommentext(e.target.value)}
                    placeholder='Add a comment...'
                    value={commenttext}
                    className='comment_ibox'
                /> <br />
                <input
                    type="button"
                    value="comment"
                    className='comment_add_btn_comments'
                />
                <button type='reset' className='reset_btn' onClick={clearComment}>cancel</button>
            </form>
            <div className="display_comment_container">
                {videoComments.length > 0 ? (
                    videoComments
                        .reverse()
                        .map((m) => (
                            <Displaycommment
                                key={m._id} // Add key for React list
                                cid={m._id}
                                userid={m.userid}
                                commentbody={m.commentbody}
                                commenton={m.commenton}
                                usercommented={m.usercommented}
                            />
                        ))
                ) : (
                    <p className="no-comments-message">No comments yet. Be the first to comment!</p>
                )}
            </div>
        </>
    );
};

export default Comment;
