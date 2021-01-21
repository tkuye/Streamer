import {SIGN_IN, SIGN_OUT} from '../actions/types'

export interface initial {
    isSignedIn:null | boolean
    userID:string | null
    payload:string
}

const INITIAL_STATE:Partial<initial> ={
    isSignedIn:null,
    userID:null,
}

type action = {
    type:string
    payload:string
}

const authReducer = (state:Partial<initial> = INITIAL_STATE, action:action) => {
    switch(action.type) {
        case SIGN_IN:
            return {...state, isSignedIn:true, userID:action.payload}
        case SIGN_OUT:
            return {...state, isSignedIn:false, userID:null}
        default:
            return state
    }    
}
export default authReducer