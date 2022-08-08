import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
import FollowHandler from "../Profil/FollowHandler";
import LikeButton from "./LikeButton";
import { updatePost } from "../../actions/post.actions";
import DeleteCard from "./DeleteCard";
import CardComment from "./CardComment";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const usersData = useSelector((state) => state.reducer.usersReducer);
  const userData = useSelector((state) => state.reducer.userReducer);
  const dispatch = useDispatch();


  const updateItem = ()=>{
    if(textUpdate){
      dispatch(updatePost(post._id, textUpdate))
    }
    setIsUpdated(false);
  }

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.posterId) {
                      return user.picture;
                    } else {
                      return null;
                    }
                  })
                  .join("")
              }
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="username">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData.map((user) => {
                      if (user._id === post.posterId) {
                        return user.username;
                      } else {
                        return null;
                      }
                    })}
                </h3>
                {post.posterId !== userData._id && (
                  <FollowHandler idToFollow={post.posterId} type={"card"} />
                )}
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            {isUpdated=== false && <p>{post.message}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange = {(e)=>setTextUpdate(e.target.value)}
                />
                <div className="button-container-validate">
                  <button className="btn" onClick={updateItem}>
                    Validate
                  </button>

                </div>

                
              </div>
            ) }
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}
            {post.video && (
              <iframe
                title={post._id}
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
            {userData._id === post.posterId && (
              <div className="button-container">
                <div onClick={()=>{setIsUpdated(!isUpdated)}}>
                  <img src="./img/icons/edit.svg" alt = 'edit'/>
                </div>
                <DeleteCard id = {post._id} />
              </div>
    
            )
            }
            <div className="card-footer">
              <div className="comment-icon">
                <img  onClick = {()=>{setShowComments(!showComments)}}src="./img/icons/message1.svg" alt="comment" />
                <span>{post.comments.length}</span>
              </div>
              <LikeButton post={post} />
            </div>
            {showComments && <CardComment post = {post} />}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
