// ::string => ::Document
const creatDomFromString = (string) => {
    const div = document.createElement('div');
    div.innerHTML = string;
    return div;
}

class LikeButton {
    constructor() {
        this.state = { isLiked: false };
    }
    setState(state) {
        const oldEl = this.el;
        this.state = state;
        this.el = this.render();
        if (this.onStateChange) this.onStateChange(oldEl, this.el);
    }

    changeLikeText() {
        this.setState({
            isLiked: !this.state.isLiked
        });
    }
    render() {
        this.el = creatDomFromString(`
        <button class="like-btn">
            <span class="like-text">${this.state.isLiked ? '取消' : '点赞'}</span>
            <span>👍</span>
        </button>
    `)
        this.el.addEventListener('click', this.changeLikeText.bind(this), false);
        return this.el;
    }
}

const wrapper = document.querySelector('.wrapper');

const likeButton1 = new LikeButton();
wrapper.appendChild(likeButton1.render());
likeButton1.onStateChange = (oldEl, newEl) => {
    wrapper.insertBefore(newEl, oldEl);
    wrapper.removeChild(oldEl);
}

// const likeButton2 = new LikeButton();
// wrapper.appendChild(likeButton2.render());

// const button = document.querySelector('.like-btn');
// const buttonText = document.querySelector('.like-text');

// let isLiked = false;

// button.addEventListener('click', () => {
//     isLiked = !isLiked;
//     if (isLiked) {
//         buttonText.innerHTML = '取消';
//     } else {
//         buttonText.innerHTML = '点赞';
//     }
// }, false);