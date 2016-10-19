const { h, Component } = require('preact');

class Waypoint extends Component {
    isInside() {
        const waypointTop = this.mark.getBoundingClientRect().top;

        const contextHeight = this.container !== window ?
            this.container.offsetHeight :
            window.innerHeight;
        const contextScrollTop = this.container !== window ?
            this.container.getBoundingClientRect().top :
            0;

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
        this.handleScroll(null);
    }

    componentWillUnmount() {
        this.container.removeEventListener('scroll', this.boundScroller);
    }

    render() {
        // use mark later to check scroll position against
        return <span ref={e => this.mark = e} />;
    }
}

module.exports = Waypoint;
