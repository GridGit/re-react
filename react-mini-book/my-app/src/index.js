import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';


class Title extends Component {
    handleClickOnTitle(e) {
        console.log('click title', '');
        console.log(e.target.innerHTML, '');
    }
    render() {
        return (
            <div>
                <h1 onClick={this.handleClickOnTitle}>mini book</h1>
            </div>
        )
    }
}

class Header extends Component {
    render() {
        return (
            <div>
                <Title />
                <h2>this is a Header</h2>
            </div>
        )
    }
}

class Main extends Component {
    render() {
        return (
            <div>
                <h2>this is main content</h2>
            </div>
        )
    }
}

class Footer extends Component {
    render() {
        return (
            <div>
                <h2>this is Footer</h2>
            </div>
        )
    }
}

class Index extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <Main></Main>
                <Footer></Footer>
            </div>
        )
    }
}

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
