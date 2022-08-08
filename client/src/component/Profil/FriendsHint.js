import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import FollowHandler from "./FollowHandler";

const FriendsHint = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(true);
  const [friendsHint, setFriendsHint] = useState([5]);
  const userData = useSelector((state) => state.reducer.userReducer);
  const usersData = useSelector((state) => state.reducer.usersReducer);

  useEffect(() => {
    const notFriendList = () => {
      let array = [];
      usersData.map((user) => {
        if (
          user._id !== userData._id &&
          !user.followers.includes(userData._id)
        ) {
          return array.push(user._id);
        }else{
            return null
        }
      });
      array.sort(() => 0.5 - Math.random());

      if(window.innerHeight>780){
        array.length = 8;
      }else if (window.innerHeight>540){
        array.length= 6;
      }else{
        array.length = 0;
      }



      setFriendsHint(array);
    };

    if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
      notFriendList();
      setIsLoading(false);
      setPlayOnce(false);
    }
  }, [userData, usersData, playOnce]);
  return (
    <div className="get-friends-container">
      <h3>Suggestion</h3>
      {isLoading ? (
        <div className="icon">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      ) : (
        <ul>
            {friendsHint && friendsHint.map((user)=>{
                for (let i =0; i<usersData.length; i++){
                    if(user === usersData[i]._id){
                        return (
                            <li className="user-hint" key={user}>
                                <img src={usersData[i].picture} alt='user-pic' />
                                <h4>{usersData[i].username}</h4>
                                <FollowHandler idToFollow={usersData[i]._id} type={'suggestion'}/>
                            </li>
                        )
                    }
                }
                return null
            })}
        </ul>
      )}
    </div>
  );
};

export default FriendsHint;
