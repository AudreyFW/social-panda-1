import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, timestampParser } from "../Utils";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../../actions/post.actions";


const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.reducer.userReducer);
  const error = useSelector((state) => state.reducer.errorReducer.postError);
  const dispatch = useDispatch();

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handlePost = async() => {
    if (message || postPicture ){
        const data = new FormData();
        
        data.append('posterId', userData._id);
        data.append('message', message);
        if(file){data.append('file', file)};
        
        await dispatch(addPost(data));
        dispatch(getPosts());
        cancelPost();

    }else{
        alert('Enter a post')
    }
  };


  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setFile("");
  };


  useEffect(() => {
    if (!isEmpty(userData))setIsLoading(false);
},[setIsLoading, userData] )

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="data">
            <p>
              <span>{userData.following ? userData.following.length : 0}</span>{" "}
              Following
            </p>
            <p>
              <span>{userData.followers ? userData.followers.length : 0}</span>{" "}
              Follower
              {userData.followers && userData.followers.length > 1 ? "s" : null}
            </p>
          </div>
          <NavLink exact to="/profil">
            <div className="user-info">
              <h4>{userData.username}</h4>
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="What's up ? "
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
            />
            {message || postPicture > 15 ? (
              <li className="card-container">
                <div className="card-left">
                  <img src={userData.picture} alt="user-pic" />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="username">
                      <h3>{userData.username}</h3>
                    </div>
                    <span>{timestampParser(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{message}</p>
                    <img src={postPicture} alt="" />
                  </div>
                </div>
              </li>
            ) : null}

            <div className="footer-form">
              <div className="icon">
                { 
                  <>
                    <img src="./img/icons/picture.svg" alt="img" />
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
                }
                
              </div>
              {!isEmpty(error.format) && <p>{error.format}</p>}
              {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
              <div className="btn-send">
                {message || postPicture > 15 ? (
                  <button className="cancel" onClick={cancelPost}>
                    Cancel
                  </button>
                ) : null}

                <button className="send" onClick={handlePost}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default NewPostForm;
