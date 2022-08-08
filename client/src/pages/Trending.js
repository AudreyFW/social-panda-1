import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../component/AppContext";
import Card from "../component/Post/Card";
import FriendsHint from "../component/Profil/FriendsHint";
import Trends from "../component/Trends";
import { isEmpty } from "../component/Utils";

const Trending = () => {
  const uid = useContext(UidContext);
  const trendList = useSelector((state) => state.reducer.trendingReducer);

  return (
    <div className="trending-page">
      <div className="main">
        <ul>
          {!isEmpty(trendList[0]) &&
            trendList.map((post) => <Card post={post} key={post._id} />)}
        </ul>
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <Trends />
          {uid && <FriendsHint />}

        </div>
      </div>
    </div>
  );
};

export default Trending;
