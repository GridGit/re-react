import React, { Component} from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import wrapWithLoadData from './wrapWithLoadData'
import PropTypes from 'prop-types'


class CommentApp extends Component {
    static propTypes = {
        data: PropTypes.any,
        saveData: PropTypes.func.isRequired
    }

    constructor (props) {
        super()
        this.state = {
            comments: props.data || [],
        }
    }

    handleSubmitComment(comment) {
        if (!comment) return;
        if (!comment.username) return alert('请输入用户名');
        if (!comment.content) return alert('请输入评论内容');
        let comments = this.state.comments;
        comments.push(comment)
        this.setState({
            comments: comments
        });
        this.props.saveData(comments);
    }
    handleDeleteComment (index) {
        const comments = this.state.comments
        comments.splice(index, 1)
        this.setState({ comments })
        this.props.saveData(comments)        
    }

    render() {
        return (
            <div className="wrapper">
                <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
                <CommentList onDeleteComment={this.handleDeleteComment.bind(this)} comments={this.state.comments}></CommentList>
            </div>
        )
    }
}

CommentApp = wrapWithLoadData(CommentApp, 'comments');
export default CommentApp;