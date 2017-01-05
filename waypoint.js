const { h, Component } = require('preact');

class Waypoint extends Component {
    isInside() {
        const waypointTop = this.base.getBoundingClientRect().top;

        // grab this.props.container's height
        const contextHeight = this.container !== window ?
            this.container.offsetHeight :
            window.innerHeight;

        // grab this.props.container's scrollTop (window is always 0)
        const contextScrollTop = this.container !== window ?
            this.container.getBoundingClientRect().top :
            0;

        // if waypoint is in between container's top and bottom edges
        // return true, false if above top or below bottom
        return (
            contextScrollTop <= waypointTop &&
            waypointTop <= contextScrollTop + contextHeight
        );
    }

    handleScroll(event) {
        const current = this.isInside();
        const prev = this._prev || false;
        this._prev = current;

        // don't fire if previous call was the same
        if (prev === current) return;

        // default callbacks
        const { onEnter=() => {}, onLeave=() => {} } = this.props;
        if (current) onEnter(event);
        if (prev) onLeave(event);
    }

    componentDidMount() {
        this.container = this.props.container || window;

        // bind before adding as a listener so we can remove later
        this.boundScroller = this.handleScroll.bind(this);
        this.container.addEventListener('scroll', this.boundScroller);

        // possibly call onEnter when mounting if waypoint is visible
        this.handleScroll(null);
    }

    componentWillUnmount() {
        this.container.removeEventListener('scroll', this.boundScroller);
    }

    render() {
        return h('span');
    }
}

module.exports = Waypoint;
