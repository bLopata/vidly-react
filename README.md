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

`render()` is called when React renders the object returned from the VirtualDOM in the ReactDOM, after which the component is mounted - or contained within the React DOM. When a component is rendered, all of the children are rendered recursively.

## **Updating phase**

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

## Routing

### Route component

The `Route` component, is essentially a wrapper around the `component` parameter. When the url path matches the parameter in the path parameter, the props `history`, `location`, and `match` are passed to the component.

This render method is an arrow function which takes the props (for `history`, `location`, and `match` as stated above) which are spread along with the `sortby` custom prop.

Using the `exact` parameter in a Route tag will prevent the loading of a generic component when routing to a subpage. Alternatively, you can employ the `<Switch>` tag, and list the routes from most specific to most general as the `<Switch>` tag will match only one route.

### Route parameters

Below is a generic example for the using the Route component wrapper in React.

```html
<Route path="/posts" component={Posts} />
```

If custom props are required, you pass the `render` method instead of component.

```html
render={props => <Products sortby="newest" {...props} />}
```

## Query string

A query string is appended to a url and looks like this:

```html
?sortBy=newest&approved=true
```

Using the `parse()` method query-string NPM package, we can extract the query string parameters from the URL to be used in our application logic.

## Redirects

Redirects can be used to handle invalid HTTP requests from an unknown URL, or to reroute the user from one site to one in the application.

First, you declare the Route for the not found page:

```html
<Route path="/not-found" component={NotFound} />
```

and then set up the Redirect using react-router-dom, at the end of the Routes (when a user navigates to a URL, this URL is checked against the routes specified in sequential order. Putting the not-found URL last ensures that the user is redirected here only if the URL entered does not match an existing route.):

```html
<Redirect to="/not-found" />
```

### Programmatic Navigation

The `history` prop contains several methods, `goBack()`,`goForward()`, `push()`, `replace()`, among others. The `replace()` method can be used to avoid a user navigating back to a page whereas the `push()` method will allow backward navigation.

## Forms

### Handling form submission

To prevent a full page reload when submitting a form, use the `onSubmit` method in the `<form>` component, and prevent default in the method call like so:

```js
handleSubmit = e => {
  e.preventDefault();
};
```

```html
 <form onSubmit={this.handleSubmit}>
```

### Refs

To access a dom element, you create a ref using

```js
username = React.createRef();
```

Now, to access the username property, use the ref you created rather than accessing the DOM object directly.

### Controlled Elements

Just like controlled components, which obtain data through props and update the state through event handlers, controlled form elements work similarly.

```html
<form onSubmit={this.handleSubmit}>
  <div className="form-group">
    <label htmlFor="username">Username</label>
    <input
      onChange={this.handleInput}
      value={account.username}
      id="username"
      name="username"
      type="text"
      className="form-control"
    />
```

We set the `value` and `name` properties, and update our `state` object and `handleInput()` method to bind to these properties:

```js
state = {
  account: { username: "", password: "" }
};

handleInput = ({ currentTarget: input }) => {
  const account = { ...this.state.account };
  account[input.name] = input.value;
  this.setState({ account });
};
```

NOTE: Initialize your inputs to an empty string, or a value obtained from the server to avoid a keyUp error for passing a value to an uncontrolled element.

### Form validation

We can add an `error` object in the `state`, and then add a `validate()` method like this:

```js
validate = () => {
  const errors = {};
  const { account } = this.state;
  if (account.username.trim() === "") errors.username = "Username is required.";
  if (account.password.trim() === "") errors.password = "Password is required.";
  return Object.keys(errors).length === 0 ? null : errors;
};
```

The object returned from this `validate()` method can be used in the `handleSubmit()` method to set the state:

```js
this.setState({ errors: errors || {} });
```

### Helper methods

Helper methods are encapsulated in a common component, like a form, and called by the higher level component to render form elements:

```js
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
```

```html
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleInput}
        error={errors[name]}
      />
    );
  }
```

The data is passed via state, and the name, label, and type (defaulted to text) are passed via the method call.

And, implementation in the `movieForm` component:

```html
 render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
        </form>
      </div>
    );
  }
```

### Rest operator

Our `input` module has several self-named parameters, namely `onChange={onChange}`, `type={type}`, and `value={value}`. We can simplify this code by using the rest operator in the object destructuring input to the Input stateless functional component.

So,

```js
const Input = ({ name, label, value, error, onChange, type, value }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input onChange={onChange}
        error={error}
        value={value}
        name={name}
        id={name}
        className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};
```

Becomes

```js
const Input = ({ name, label, value, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};
```

### Conditional rendering

```html
{error && <div className="alert alert-danger">{ error }</div>}
```

This html tag is only rendered if the `error` property is truthy, i.e. if there is an error.

# Calling backend services

## Lifecycle of a request

## Pessimistic vs optimistic updates

A pessimistic update is calling an http endpoint (and awaiting the response) before updating the UI, whereas optimistic updates update the UI first, and assume the http request will be successful. Wrapping the http request in a try catch block after copying the state, and then calling `this.setState()` with the copied state will allow the application to revert the change if an error occurs. Like so:

```js
handleDelete = async post => {
  const originalPosts = this.state.posts;
  const posts = this.state.posts.filter(p => p.id !== post.id);
  this.setState({ posts });
  try {
    await axios.delete(apiEndpoint + "/" + post.id);
  } catch (ex) {
    alert("Something failed when deleting the post!");
    this.setState({ posts: originalPosts });
  }
};
```
