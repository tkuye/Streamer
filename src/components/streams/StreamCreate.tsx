import React from 'react'
import { connect } from 'react-redux'
import { createStream } from '../../actions'
import StreamForm from './StreamForm'
interface StreamCreateProps{
        createStream:(formValues:any) => {}
        
}


class StreamCreate extends React.Component<StreamCreateProps> {
   
   
        onSubmit = (formValues:object):void => {
               this.props.createStream(formValues)
        }

    render () {
        return (<div>
        <h3>Create a Stream</h3>
                <StreamForm onSubmit={this.onSubmit}/>
                </div>
        )}
        };







export default connect(null, {createStream})(StreamCreate)