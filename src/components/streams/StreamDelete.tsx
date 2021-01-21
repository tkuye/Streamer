import React from 'react';
import Modal from '../Modal';
import {connect} from 'react-redux';
import {fetchStream, deleteStream} from '../../actions';
import history from '../../history';
import StreamList from './StreamList'
export interface StreamDeleteProps {
        fetchStream:(id:number) => Promise<void>;
        deleteStream:(id:number) => Promise<void>;
       stream:{title:string;
description:string};
       id:number;
};

class StreamDelete extends React.Component<StreamDeleteProps>{
        
        componentDidMount() {
                this.props.fetchStream(this.props.id)
        };
        
        delete() {
        this.props.deleteStream(this.props.id)
        
        };
        actions = (
                <React.Fragment>
                        <button onClick={() => this.delete()} className="ui button negative">Delete</button>
                        <button onClick={() => history.push('/')}className="ui button ">Cancel</button>
                </React.Fragment>
        );
        
        content = () => {
               return ( <React.Fragment>
                        <p>Are you sure you want to delete stream <span className="ui label">{this.props.stream?.title}</span> ?</p>
                </React.Fragment>
               )
        };

        render() {
        return (
                
                <div> 
                <StreamList />
                <Modal title="Delete Stream"
                content={this.content}
                actions={this.actions}
                onDismiss={() => history.push('/')}
                />
                
                </div>   
                );
        };
}

export const mapStateToProps  = (state: any, ownProps:{match:{params:{id:string}}}) => {
        const id:number = Number(ownProps.match.params.id)
        return {
                stream: state.streams[id],
                id};
}
export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);