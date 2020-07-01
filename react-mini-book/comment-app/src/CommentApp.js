import React, { Component} from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

class Header extends Component {
    constructor () {
      super()
      console.log('construct')
    }    
    componentDidMount () {
      console.log('component did mount')
    }
    componentWillUnmount() {
        console.log('component will unmount')
    }

    render () {
    //   console.log('render')
      return (
        <div>
          <h1 className='title'>React 小书</h1>
        </div>
      )
    }
  }

class Clock extends Component {
    constructor () {
        super()
        this.state = {
            date: new Date()
        }
    }
    componentWillMount () {
        this.timer = setInterval(() => {
            this.setState({ date: new Date() })
        }, 1000)
    }
    componentWillUnmount () {
        clearInterval(this.timer)
    }
    
    render () {
        return (
            <div>
                <h1>
                    <p>现在的时间是</p>
                    {this.state.date.toLocaleTimeString()}
                </h1>
            </div>
        )
    }
  }
console.log(Header, Clock)

class CommentApp extends Component {
    constructor () {
        super()
        this.state = {
            comments: [],
            isShowHeader: true,
            isShowClock: true
        }
    }
    componentWillMount() {
        this._loadComments();
    }

    _loadComments() {
        let comments = localStorage.getItem('comments');
        if(comments) {
            comments = JSON.parse(comments);
            this.setState({ comments });
        }
    }

    _saveComments(comments) {
        localStorage.setItem('comments', JSON.stringify(comments))
    }

    handleShowOrHide () {
        this.setState({
          isShowHeader: !this.state.isShowHeader
        })
    }

    handleShowOrHideClock() {
        this.setState({
            isShowClock: !this.state.isShowClock
        })
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
        this._saveComments(comments);
    }
    handleDeleteComment (index) {
        const comments = this.state.comments
        comments.splice(index, 1)
        this.setState({ comments })
        this._saveComments(comments)
        // console.log(index)
    }

    render() {
        return (
            <div className="wrapper">
                {/* {this.state.isShowHeader ? <Header /> : null}
                
                <button onClick={this.handleShowOrHide.bind(this)}>
                    显示或者隐藏标题
                </button>
                {this.state.isShowClock ? <Clock /> : null}
                <button onClick={this.handleShowOrHideClock.bind(this)}>
                    显示或者隐藏时钟
                </button> */}
                <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
                <CommentList onDeleteComment={this.handleDeleteComment.bind(this)} comments={this.state.comments}></CommentList>
            </div>
        )
    }
}

export default CommentApp;