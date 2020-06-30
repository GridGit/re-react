// ::string => ::Document
const createDomFromString = (string) => {
    const div = document.createElement('div');
    div.innerHTML = string;
    return div;
}

class Component {
    constructor(props = {}) {
        this.props = props;
    }
    setState(state) {
        const oldEl = this.el;
        this.state = state;
        this._renderDOM();
        if (this.onStateChange) this.onStateChange(oldEl, this.el);
    }
    _renderDOM() {
        this.el = createDomFromString(this.render());
        if (this.onClick) {
            this.el.addEventListener('click', this.onClick.bind(this), false);
        }
        return this.el;
    }
}

const mount = (component, wrapper) => {
    wrapper.appendChild(component._renderDOM());
    component.onStateChange = (oldEl, newEl) => {
        wrapper.insertBefore(newEl, oldEl);
        wrapper.removeChild(oldEl);
    }
}


class LikeButton extends Component {
    constructor(props) {
        super(props);
        this.state = { isLiked: false };
    }

    onClick() {
        this.setState({
            isLiked: !this.state.isLiked
        });
    }
    render() {
        return `
            <button class="like-btn" style="background-color: ${this.props.bgColor}">
                <span class="like-text">${this.state.isLiked ? '取消' : '点赞'}</span>
                <span>👍</span>
            </button>
        `
    }
}

const wrapper = document.querySelector('.wrapper');

mount(new LikeButton({bgColor: 'gray'}), wrapper);

// const likeButton1 = new LikeButton();
// wrapper.appendChild(likeButton1.render());
// likeButton1.onStateChange = (oldEl, newEl) => {
//     wrapper.insertBefore(newEl, oldEl);
//     wrapper.removeChild(oldEl);
// }

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