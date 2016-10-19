# preact-waypoint

Super minimal port of [react-waypoint](https://github.com/brigade/react-waypoint) to work with [Preact](https://preactjs.com/), supporting a subset of the [react-waypoint](https://github.com/brigade/react-waypoint) props.

## Install

    npm install preact-waypoint

## Usage

`<Waypoint />` should be placed at the end of whatever list or scrollable section that needs to fire a callback once reached:

```javascript
const { h, render } = require('preact');
const Waypoint = require('preact-waypoint');

const List = ({ items }) => (
    <ul class="list">
        { items.map(i => <li class="item">{i}</li>) }
        <Waypoint
            onEnter={() => console.log('just entered Waypoint')}
            onLeave={() => console.log('just left Waypoint')}
        />
    </ul>
);

render(<List items={['sweet', 'dude', 'awesome', 'neat']} />, document.body);
```

## Props

`onEnter` and `onLeave` function like their counterparts in [react-waypoint](https://github.com/brigade/react-waypoint).

`container` is optional, defaulting to `window`, and must be a parent element that has either `overflow: scroll-y;` or `overflow: scroll;` set to allow for scrolling. This decision was to make explicit the implicit DOM crawling that [react-waypoint](https://github.com/brigade/react-waypoint) does to find a `scrollableAncestor`.

## Contributing

Pull requests welcome! This project isn't intended to closely track its React counterpart but instead provide similar but minimal functionality to Preact users.
