import React, { useContext } from 'react';
import { UidContext } from '../component/AppContext';

import Thread from '../component/Thread';
import NewPostForm from '../component/Post/NewPostForm';
import Log from '../component/Log/';
import Trends from '../component/Trends';
import FriendsHint from '../component/Profil/FriendsHint';

const Home = () => {
    const uid = useContext(UidContext);


    return (
        <div className='home'>
            <div className='main'>
                <Thread />
            </div>
            
            <div className='right-side'>
                <div className='right-side-container'>
                    <div className='wrapper'>
                    {uid ? <NewPostForm /> : <Log signin = {true} signup = {false}/>}
                    <Trends />
                    {uid && <FriendsHint />}

                    </div>
                </div>
            </div>
          

            
        </div>
    );
};

export default Home;