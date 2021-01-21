import React from 'react'
import {fetchStreams} from '../../actions'
import {connect} from'react-redux'
import { Link } from 'react-router-dom'

interface stream {
        id:number
        title:string;
description:string
userID?:string
}



interface StreamListProps {
        fetchStreams:() => void;
        streams?:stream[]
        userID?:string
        isSignedIn:boolean
}

class StreamList extends React.Component<StreamListProps> {



componentDidMount() {
        this.props.fetchStreams()
}
renderAdmin(stream:stream, id:number):JSX.Element {
        if (this.props.userID === stream.userID){
                return (<div className="right floated content">
                        <Link to={`streams/edit/${id}`} className="ui primary button">Edit</Link>
                        <Link to={`streams/delete/${id}`}className="ui button">Delete</Link>
                        </div>
                )
        }
        return (<div></div>)
}
renderCreate():JSX.Element {
        if (this.props.isSignedIn) {
        return (<Link to="/streams/new"><div>
                        <div className="fluid ui secondary button">Create Stream</div>
                </div></Link>)
        }
        return (<div/>)
}

renderStreams():JSX.Element[] | undefined {
        const streamList = this.props.streams?.map((stream) => {
                return (<div className="item" key={stream.id}>
                          {this.renderAdmin(stream, stream.id)}
                <i className="large middle aligned icon camera"/>
                <div className="content"><Link to={`/streams/${stream.id}`}className="header">{stream.title}</Link>
                <div className="description">{stream.description}</div>
                </div>
               
                </div>
                
                )
        })
        return streamList
}

render () {

        return (<div>
                <h2>Streams</h2>
                <div className="ui celled list">
                        {this.renderStreams()}</div>
                        {this.renderCreate()}
                        </div>
)};
}

const mapStateToProps = (state:{streams: object
auth:{userID:string; isSignedIn:boolean}}) => {
return {streams:Object.values(state.streams), 
userID:state.auth.userID, 
isSignedIn:state.auth.isSignedIn
}
}
export default connect(mapStateToProps, {fetchStreams})(StreamList)
