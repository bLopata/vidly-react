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
