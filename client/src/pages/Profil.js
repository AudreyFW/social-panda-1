import React, {useContext} from 'react';
import Log from '../component/Log';
import {UidContext} from '../component/AppContext';
import UpdateProfil from '../component/Profil/UpdateProfil';

const Profil = () => {
    const uid = useContext(UidContext);

    return (
        <div className='profil-page'>
            {uid? (<UpdateProfil />):(
            <div className='log-container'>
                <Log signin = {false} signup={true}/>
                <div className='img-container'>
                    <img src='./img/panda-31965.png' alt='img-log' />
                </div>
            </div>)}
        </div>
    );
};

export default Profil;