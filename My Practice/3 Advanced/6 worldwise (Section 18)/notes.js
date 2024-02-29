// now as you learned in the previous lecture

// just because you now know how to use the context API

// that doesn't mean that it's always the right tool

// or the right solution

// for managing the state in your applications.
// when you have a small sized application

// like this one that we are building right now and where
"";
// performance is never going to be an issue, then

// the context API is a great tool indeed.

//* 1) Create context folder
//* 2) Create citiesContext.jsx
//* 3) create CitiesContext and Cities provider function comp
//* 4) Grab all state code and state updating code from App.jsx and place inside Cities provider function com

//*==================

// you might be wondering why we actually need

// to do that if we could simply get this object

// out of the array that we already have, right?

// And that's actually true in this small application.

// So technically we wouldn't have to create a new HTTP request

// and fetch this data from the server again

// because we do actually already have it in the cities array.

// However, in real world web applications, it's quite common

// that the single objects have a lot more data

// than the entire collection.

// So basically this array here

// would only have a small amount of data in each object

// while then the objects that we get individually

// from the API have really all the data.

// And so let's pretend that we really need to do this.

// So making a request to this URL and then slash the ID.

//*========================================
//! video 229:  flow of getting and rendering current city
// when we click here on this link here the URL will change.

// So we get a new ID

// which we then read here into the city component.

// So then we have this ID

// and we use it to call the get city function

// as the component mounts.

// So immediately after mounting,

// we start calling this function

// which is coming from our context, remember?

// So here we have the get city function,

// which will then immediately start fetching

// the city data for that ID.

// Then when that arrives

// it gets stored here into the set current city state.

// So this state variable right here,

// which we also paste into the context value.

// And so then immediately here

// this city component receives that value as it updates.

// And then well here we de-structure it

// and then display everything in the UI.

// So basically here we do child to parent communication.

// So we call this function here

// which will then update the current city

// and then the current city will come back down here

// into this component where we can then use it.
//*========================================

//! video 230:

//* npm i react-leaflet leaflet

//* MapContainer is responsible for map rendering
