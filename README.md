# React

## Binding Event Handlers

Arrow functions don't rebind the `this` keyword, rather they inherit it.

```js
constructor() {
  super();
  this.handleIncrement = this.handleIncrement.bind(this);
}
```

can be replaced with the event handler arrow function.

```js
handleIncrement = () => {
  console.log("Increment clicked", this);
  this.count++;
};
```

## Updating the state

Within the event handler, `handleIncrement()`, now an arrow function, we can modify the state of the `count` using

```js
this.setState({ count: this.state.count + 1 });
```

The properties of the object passed to the `setState()` method will be merged with the `state` object, or will overwrite the values if they exist.

When the state changes, React will compare the Virtual DOM with the old DOM and identify what changes have been made. In our `render()` method, the `<span>` tag, which contains the dynamic reference to `formatCount` and the `count` state variable is what is updated, so React will udpate only the `count` variable.

```js
  render() {
    return (
      <div>
        <span className={this.getBageClassses()}>{this.formatCount()}</span>
        <button
          onClick={this.handleIncrement}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
      </div>
    );
```

## Passing Event Arguments

Whenever you need to pass an argument, simply define the argument as an input to the arrow function event handler, i.e.

```js
onClick={() => this.handleIncrement(product)}
```

## Lifting the state

Previously, our `index.js` file was rendering only the Counters class in the ReactDOM. With the addition of a NavBar which required the count of total active counters, the state of the `Counters` class object needing to be lifted to the `App.js` file along with the `NavBar`. Similar to implementing `Counters` which inherited from `Counter`, the `Counters` class now only passes events --known as "bubbling up" events-- such as `onDelete`, `onIncrement` through props to the `App.js` file to be rendered in the DOM.

## Stateless functional component

Rather than using a class, you can use a stateless functional component (**sfc**). For example in our navbar component, which had a `NavBar` class, can be represented by the following sfc

```js
const NavBar = props => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand">
        Navbar{" "}
        <span className="badge badge-pill secondary">
          {props.totalCounters}
        </span>
      </a>
    </nav>
  );
};
```

Note that the props were passed in as an input to the arrow function rather than referencing `this.props` in the Class implementation.

## Object destructuring

Rather than referencing `this.props` numerous times, you can use object destructuring to simplify the code for passing the props. for instance, in our `counters.jsx` component,

```js
const { onReset, onDelete, counters, onIncrement } = this.props;
```

and the references to `this.props.onReset` become simply `onReset`.

## Lifecycle Hooks

Components go through several phases in their lifecycle.
The first is the Mount phase, which has three lifecycle hooks:

- constructor
- render
- componentDidMount

Next is the update phase, with two hooks:

- render
- componentDidUpdate

Finally is the unmounting phase, which has one hook:

- componentWillUnmount

## Mounting phase

The Constructor property is called once upon mounting an object in the DOM. The state can be set directly in the constructor. This is the correct place to initialize the properties.

### componentDidMount

This method is called once after the component is mounted in the DOM. This is the place to make Ajax calls and set the state with data from the server.

### Render

`render()` is called when React renders the object returned from the VirtualDOM in the ReactDOM, after which the component is mounted - or contained within the React DOM. When a component is rendered, all of the children are rendered recursively. The output of our App in the console is as follows:

```
App - Constructor
App - Rendered
NavBar - Rendered
Counters - Rendered
(5)Counter - Rendered
App - Mounted
```

## Updating phase

## Pagination

## Type checking

Using the `prop-types` package, we can added type checking to our pagination component like so:

```js
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};
```

Adding type checking also adds documentation to props required in the app, their types, and if they are required or not.
