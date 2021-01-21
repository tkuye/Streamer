import React from 'react'
import {connect} from 'react-redux'
import {fetchStream} from '../../actions'
import {mapStateToProps, StreamDeleteProps as StreamShowProps} from './StreamDelete'

     

class StreamShow extends React.Component<StreamShowProps> {
componentDidMount() {
        this.props.fetchStream(this.props.id)
}

render () {
                
        return (
                <div>
                <h1>{this.props.stream?.title}</h1>
                <h5>{this.props.stream?.description}</h5>
                </div>
)};

}



export default connect(mapStateToProps, {fetchStream})(StreamShow)