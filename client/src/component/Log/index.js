import React, { useState } from 'react';
import SignUpForm from './SignUpForm.js';
import SignInForm from './SignInForm.js';

const Log = (props) => {
    const [SignUpModal, setSignUpModal] = useState(props.signup);
    const [SignInModal, setSignInModal] = useState(props.signin);

    const handleModals=(e)=>{
        if(e.target.id ==='register'){
            setSignInModal(false);
            setSignUpModal(true);
        }else if(e.target.id ==='login'){
            setSignUpModal(false);
            setSignInModal(true);
        }
    }

    return (
        <div className='connection-form'>
            <div className='form-container'>
                <ul>
                    <li 
                        onClick={handleModals} 
                        id='register' 
                        className={SignUpModal?'active-btn': null}
                        >Register
                    </li>
                    <li 
                        onClick={handleModals} 
                        id='login'
                        className={SignInModal?'active-btn': null}
                        >Log In
                    </li>
                </ul>
                {SignUpModal && <SignUpForm />}
                {SignInModal && <SignInForm />}
            </div>
        </div>
    );
};

export default Log;