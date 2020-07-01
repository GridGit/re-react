import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

class LikeButton extends Component {
    static defaultProps = {
        likedText: '取消',
        unlikedText: '点赞'
    }

    constructor() {
        super();
        this.state = {isLiked: false}        
    }

    handleClickOnLikeButton() {
        this.setState({
            isLiked: !this.state.isLiked
        })
    }

    render() {
        // const likeText = this.props.likeText || '取消';
        // const unlikeText = this.props.unlikeText || '点赞';
        // const wordings = this.props.wordings || {
        //     likeText: '取消',
        //     unlikeText: '赞'
        // }
        return (
            <button onClick={this.handleClickOnLikeButton.bind(this)}>
                {this.state.isLiked ? this.props.likedText : this.props.unlikedText} 👍
            </button>
        )
    }
}

const users = [
    { username: 'Jerry', age: 21, gender: 'male' },
    { username: 'Tomy', age: 22, gender: 'male' },
    { username: 'Lily', age: 19, gender: 'female' },
    { username: 'Lucy', age: 20, gender: 'female' }
  ]
  
class User extends Component {
    
    render() {
        const {user} = this.props;
        return (
            <div>
                <span>姓名：{user.username}</span>
                <span>年龄：{user.age}</span>
                <span>性别：{user.gender}</span>
            </div>
        )
    }
}  

class Index extends Component {
    constructor() {
        super()
        this.state = {
            likedText: '已赞',
            unlikedText: '赞'
        }
    }    
    handleClickOnChange () {
        this.setState({
          likedText: '取消',
          unlikedText: '点赞'
        })
    }

    render() {
        return (
            <div>
                <LikeButton  likedText={this.state.likedText} unlikedText={this.state.unlikedText}></LikeButton>
                <button onClick={this.handleClickOnChange.bind(this)}>
                    修改 wordings
                </button>
                <div>
                    {users.map((user, i) => <User key={i} user={user}/>)}
                </div>
            </div>
        )
    }
}

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <Index/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
