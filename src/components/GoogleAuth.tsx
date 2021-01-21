import React from 'react'
import {GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout} from 'react-google-login'
import {connect }from 'react-redux'
import {signIn, signOut} from '../actions'
import {initial} from '../reducers/authReducer'

declare global {
    interface Window {
        gapi:any
       
    }
}
window.gapi = window.gapi || {}

interface GoogleAuthProps {
    auth?:{
        currentUser:{
            get():{
                getId: () => string
            }
        }
    }
    signIn:(userID: string) => any
    signOut:() => any;
    isSignedIn:boolean | null
    userID:string
    
}

class GoogleAuth extends React.Component<GoogleAuthProps> {
   
    
    auth = {
        getId: () => {},
        signIn:() => {},
        signOut:() => {},
        isSignedIn:{
        get: () => {return true || false},
        listen: (a:any) => {},},
        currentUser:{
            get: () => { return { getId: () => {return ""}}
            }
        }
        
        }


componentDidMount() {
    window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
            clientId:'8060786050-qo18asfoa5jsgb5135a4gvkln9l7ea33.apps.googleusercontent.com',
            scope: 'email'
        }).then(() => {
            this.auth = window.gapi.auth2.getAuthInstance()
            this.onAuthChange(this.auth.isSignedIn.get())
            this.auth.isSignedIn.listen(this.onAuthChange)
        })
    })
}

onAuthChange = (isSignedIn:boolean) => {
    if (isSignedIn) {
        this.props.signIn(this.auth.currentUser.get().getId())
    } else {
        this.props.signOut()
    }
}

googleResponse(response: GoogleLoginResponse| GoogleLoginResponseOffline) {
    console.log(response)
}
render () {
    if (this.props.isSignedIn === null) {
        return <div></div>
    }
    return (
        
        <div>
            {this.props.isSignedIn ? <GoogleLogout clientId='8060786050-qo18asfoa5jsgb5135a4gvkln9l7ea33.apps.googleusercontent.com' 
        buttonText="Logout"
        onLogoutSuccess={() => {console.log('Logout Success')}}/>:<GoogleLogin  clientId='8060786050-qo18asfoa5jsgb5135a4gvkln9l7ea33.apps.googleusercontent.com'
        buttonText="Sign in with Google"
        onSuccess={this.googleResponse}
        onFailure={this.googleResponse}
        cookiePolicy={'single_host_origin'}
        />}</div>
)};
}

interface newInitial extends initial {
    auth:{isSignedIn:boolean | null;
        userID: string
    }
}
const mapStateToProps = (state:newInitial) => {
    return {isSignedIn: state.auth.isSignedIn,
        userID:state.auth.userID,
    }
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth)