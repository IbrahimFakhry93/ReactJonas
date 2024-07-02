//? the idea of a Compound Component
//* is that we can create a set of related components
//* that together achieve a common and useful task,
//* for example, implementing a counter as in this lecture

//* this pattern can also be used in all kind of components that are actually more useful,
//* for example modal windows, pagination, tables,

//? the way we implement this pattern

//* It's that we create a parent component, and then a few different child components
//* that really belong to the parent, and that really only make sense when used together
//* with the parent component.

//? Example:

//* And a good example of this is the HTML <select></select>
//* and option elements <option></option>

//* So the select element implements a select box and the option element implements each
//* of the select options inside the select box.

// as we are going to use in compound components.

// And this will then allow us to implement highly flexible

// and highly reusable components

// with a very, very expressive API.

// And all without basically using no props at all.

// So after implementing this example,

// and the next ones in the next few videos,

// you will see the potential for using this everywhere.

// And let me actually start by showing you

// how we are going to use the component that we're going

// to build in practice.

// So that will then show you how this really

// is super flexible and reusable.

//*=====================

{
  /*
    
<Counter
            iconIncrease="+"
            iconDecrease="-"
            label="My NOT so flexible counter"
            hideLabel={false}
 !        hideIncrease={false}
 !        hideDecrease={false}
 !        positionCount="top"
/>


*/
}

// this is just to show (like adding PositionCount as a prop) that without the flexibility

//? of a compound component like this one:

{
  /* <Counter>
            <Counter.Decrease icon="-" />
            <Counter.Count />
            <Counter.Increase icon="+" />
            <Counter.label>My Super Flexible Counter</Counter.label>
</Counter>  */
}

// we would have to pass in 10 or 20 props to configure it

// in the same way that we can easily achieve like this.

//* Usage of context API instead of passing props in Compound components
//* So  <Counter.count /> can know the state in <Counter></Counter>
//* same for    <Counter.Increase icon="+" />

//? Steps to establish Compound Components:

//* 1) Create Context.
//* 2) Create Parent Component.
//* 3) Create Child Components to help implementing the common task of this overall compound component.
//* 4) Add child components as properties to parent component.
