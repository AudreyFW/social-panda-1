import {UNFOLLOW_USER, FOLLOW_USER, GET_USER, UPDATE_BIO, UPLOAD_PICTURE } from "../actions/user.actions";

const initialState = {};

export default function userReducer(state= initialState, action){
    switch(action.type){
        case GET_USER:
            return action.payload;

        case UPLOAD_PICTURE:
            return {
                ...state, 
                picture: action.payload
            }
        case UPDATE_BIO:
            return {
                ...state,
                bio: action.payload
            }

        case FOLLOW_USER:
            return {
                ...state, 
                following: [action.payload.idToFollow, ...state.following],
                //...state.following, permet de ne pas ecraser les données. sans, il y aurait qu 'un seul utilisateur
            }
        case UNFOLLOW_USER:
            return {
                ...state, 
                following: state.following.filter((id)=>id !== action.payload.idToUnfollow),
                }

        default: return state;

    }
}
