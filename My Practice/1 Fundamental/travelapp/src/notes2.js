// what we need to understand is that by default

// these input fields like this input and also this select

// they maintain their own state inside the DOM.

// So basically inside the HTML element itself.

// Now this makes it hard to read their values

// and it also leaves this state right here in the DOM

// which for many reasons is not ideal.

// So in React, we usually like to keep all this state

// in just one central place.

// So inside the React application and not inside the DOM.

// And so in order to do that we use a technique

// called controlled elements.

// And so with this technique

// it is React who controls and owns the state

// of these input fields and no longer the DOM.

// So since we want to now keep this data

// inside the application, what that means

// is that we need some state, right?

// Because that form data of course changes over time

// and we also want to maintain our application

// in sync with it.

// we follow three steps.

// First we create a piece of state.

// So let's start with that

// and we will start here with this actual input element.

// So with this text field right there.

// So that field is for the item description.

// And so we call it description.

// And then as always, the setter function is set description.

// And so then we use the use state hook.

// So the use state function.

// And then just like before, when VS code shows us

// this auto completion here

// make sure to click here or to hit enter

// because that will then automatically include

// so it will import this use state hook into this file.

// So it will automatically include this line of code

// and then for some reason that didn't work in your VS code

// then make sure to just write this out by hand.

// Now the default value

// for this description can just be an empty string like this.

// And so now we finished the first step of this technique.

// So we have our piece of state

// and now we use that state as a value of the input field.

// So we come down here

// to the input that we want React to control

// and then we specify the value

// which again is just a normal HTML field, alright?

// So even in HTML you can use value

// and then set it to something.

// So we could also do just this.

// Alright? But now we don't want that.

// But instead we want our description.

// Give it a save and there we go.

// Let's just reload to get rid of this.

// Yeah, here we get another warning

// and it's already telling us the third step

// that we need to take.

// But for now, let's just see what happens if for example

// here we write now test.

// So you see now our input field has the value of our state.

// Okay and now for the final step,

// we of course now need to somehow connect this state

// with the value that we are actually going to type there

// right, because now the state will simply always stay empty

// even if we type something here.

// So React is now controlling this element

// and always sets it to the description.

// But the description right now always stays

// at this empty string.

// And so no matter what we do,

// right now we cannot change this.

// So what we need to do is to also on the same element

// listen for the change event.

// So that's using the on change prop.

// And then here let's just define an inline function.

// And this function receives the event that was fired off.

// So in this case the change event.

// And then here, let's just type the code

// and I will explain what actually is happening here.

// So set description, e.target.value.

// So we define a piece of state, like this description here

// then we use that piece of state

// on the element that we want to control.

// So we basically force the element to always take the value

// of this state variable.

// And then finally, of course

// we need to update that state variable.

// And we do so here with the on change handler

// where we then set the description

// to the current value of that input field.

// And so with this, it is now this component.

// So basically it's React who is in charge

// of the state and really of the entire element.

// And so that's the reason why this technique

// is called controlled element.
