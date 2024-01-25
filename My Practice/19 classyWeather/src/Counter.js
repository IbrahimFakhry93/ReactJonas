import React from "react";

//* Counter class is a child class of Parent class React.Component
//* this parent class (React.Component) gives us a couple of methods and one of them is the render method.
//* So every single React component that is written with classes needs to include the render method.
//* So this render method is basically equivalent to the function body of a function component.
//* this render method returns JSX
class Counter extends React.Component {
  //& Adding State:
  //* call constructor method
  constructor(props) {
    super(props); //* use super to call parent constructor

    //& initialize State:
    //* to initialize state, we do that also right here in the construction method.
    //* So that's because this method here is called each time a new object is instantiated from this class.
    this.state = { count: 5 };

    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);

    //* So in class components,  we only have one huge state object and not multiple state variables
    //* like we do with the use state hook.
  }

  //! this keyword:
  //* this refers to current component instance

  //& Handling events:
  //* Declare event handlers as class methods

  handleDecrement() {
    console.log(this); //* undefined

    // However, we need the this keyword to point to the current component
    // because that's how we will update the state.

    //! why this is undefined

    //  And the reason for that is simply the way in which JavaScript works.

    // So when React calls our event handler here,  onClick={this.handleDecrement}

    // it first actually, behind the scenes, creates a copy  of this function.

    // And so then the function call  is just a normal function call,

    // which is not bound to any object.  And so because of that, this function then loses the binding

    // to the current this keyword.

    //? Solution use bind method inside the constructor
    this.setState((curState) => {
      return { count: curState.count - 1 };
    });

    // this.setState({ count: 10 });
  }

  handleIncrement() {
    this.setState((curState) => {
      return { count: curState.count + 1 };
    });
  }
  render() {
    //* simple code logic is allowed in inside render

    //& Display Date;
    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + this.state.count);
    return (
      <div>
        <button onClick={this.handleDecrement}>-</button>
        <span>
          {date.toDateString()} [{this.state.count}]
        </span>
        <button onClick={this.handleIncrement}>+</button>
      </div>
    );
  }
}

export default Counter;
