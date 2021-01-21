import React from 'react'
import {connect} from 'react-redux'
import StreamCreate from './components/streams/StreamCreate'
import StreamEdit from './components/streams/StreamEdit'
import StreamList from './components/streams/StreamList'
import StreamShow from './components/streams/StreamShow'
import StreamDelete from './components/streams/StreamDelete'
import {Route, Switch} from 'react-router-dom'



interface isloggedinProps {
    isSignedIn:boolean | null
}

const isloggedin: React.FC<isloggedinProps> = ({isSignedIn}) => {
        
    if (isSignedIn === null){
            return (
            
                <div className="ui segment" style={{height:"90vh", border:"none"}}>
  <div className="ui active inverted dimmer">
    <div className="ui huge text loader"></div>
  </div>
  <p></p>
  <p></p>
  <p></p>
</div>
        
            );

        }
          
    
    else {
        return (
            <div>
            <Switch>
            <Route path='/' exact component={StreamList}/>
            <Route path='/streams/new' exact component={StreamCreate}/>
            <Route path='/streams/delete/:id' exact component={StreamDelete}/>
            <Route path='/streams/edit/:id' exact component={StreamEdit}/>
            <Route path='/streams/:id' exact component={StreamShow}/>
            </Switch>
        </div>
        )
    }

     
}

const mapStateToProps = (state:{auth:{isSignedIn:boolean}}) => {
    return {isSignedIn:state.auth.isSignedIn}
}

export default connect(mapStateToProps)(isloggedin)