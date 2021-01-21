
import React from 'react'
import {connect} from 'react-redux'
import {fetchStream} from '../../actions'
import StreamForm from './StreamForm'
import {editStream} from '../../actions'
import _ from 'lodash'

interface StreamEditProps {
        match:{params:{id:string}}
        fetchStream:(id:number) => Promise<void>
        stream:{
        title:string
description:string}
        editStream:(id:number,formValues:any) => Promise<void>;
        id:number
        
       
}

class StreamEdit extends React.Component<StreamEditProps> {
      
       
       componentDidMount() {
         
        this.props.fetchStream(this.props.id)
        
        
       }

       onSubmit = (formValues:any) => {
                this.props.editStream(this.props.id,formValues)
                
       }
        
        
        

        render() {
                
                
                return (<div>
                        <h3>Edit a Stream</h3>
                        <StreamForm initialValues={_.pick(this.props.stream, 'title', 'description')} onSubmit={this.onSubmit}/>
                </div>);
        }
        
}

const mapStateToProps = (state:{streams:any},ownProps:{match:{params:{id:string}}}) => {
        const id:number = Number(ownProps.match.params.id)
        return {stream: state.streams[id],
        id}
}       
export default connect(mapStateToProps, {editStream, fetchStream})(StreamEdit)