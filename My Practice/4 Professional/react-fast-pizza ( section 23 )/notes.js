//& 295. Setting Up Tailwind CSS

//* npm install -D tailwindcss postcss autoprefixer
//* npm install -D tailwindcss@3  postcss autoprefixer
//* npx tailwindcss init -p  : create the Tailwind  and the post CSS config files.

//? open: tailwind.config.js
// to basically tell Tailwind

// where or index HTML file is located

// and also where all or JavaScript files are located.

// So by default they are inside this source folder

// but if for some reason we changed all of this right here

// then we would also have to change this config.

// But by default, this is how it works.

//? open index.css

//* copy and paste this:

// @tailwind base;
// @tailwind components;
// @tailwind utilities;

//? open Home.jsx

//* install tailwind css intellisense vs code extension
//^ google: tailwind prettier extension => go to github link
//* npm install -D prettier prettier-plugin-tailwindcss

// this will do is to automatically sort the order

// of the class names in the way that Tailwind recommends it.

// And this is gonna be pretty helpful for you

// because then you will always find the same class names

// in the same position of this long string here.

//? create
//* prettier.config.cjs

// prettier.config.js, .prettierrc.js, prettier.config.cjs, or .prettierrc.cjs

// /** @type {import("prettier").Config} */
// const config = {
//     plugins: ['prettier-plugin-tailwindcss'],
//     trailingComma: 'es5',
//     tabWidth: 4,
//     semi: false,
//     singleQuote: true,
// }

// module.exports = config

//* npx prettier --write .

//! This command tells Prettier to process all the files in your project and reformat them .

//^ Check for conflicts with other extensions:
//* If you’re using VS Code, there might be conflicts with other extensions.
//* Try disabling other formatting extensions to see if that resolves the issue.

//^ Reinstall the plugin:
//* There might be issues with the plugin installation. Try uninstalling and reinstalling the prettier-plugin-tailwindcss plugin.

//*==============================================================================================================================================================
//! 297. Styling Text
//? open index.html
// we can add some classes here to the body

// that we want every element on the page to inherit

// or that we want to set on the entire body element.

// So typically that is like a background color,

// or a text color that we want the entire page to inherit.

//^ letter spacing
//* tracking-[.25rem] for custom letter spacing
//* tracking-widest

//*=====================================================================

//! 298. The Box Model: Spacing, Borders, and Display

//*=====================================================================
//! 299. Responsive Design
// by default, Tailwind comes with five breakpoints

// and these breakpoints are mobile first,

// which means that they are min with media queries.

// This means that when we're working with Tailwind,

// it's usually a good idea to start

// by implementing the mobile layout.

// So a mobile-first design.

//* sm  => min width: 640px  (width of view port)

//* sm:my-16
//* means whenever the width is greater than 640, then this margin (my-16) will override the default one that we had before.

// so that these default classes

// without any prefix (such as. my-10) are the mobile-first classes.

// So they apply only if there is no breakpoint overriding them.

//* sm:px-6
// don't make the mistake that many developers make,

// which is to think that this small here means

// that this class is going to apply to small screens.

// So that's not how it works.

// How it works instead is that this class starts being applied

// from this value on.

// So from the small breakpoint on which is this 640 pixels.

// But below that everything that we have here

// without the prefix will be applied.

//^===============================================
//? note:  open: CartOverview
//* <div className="bg-stone-800 p-4 uppercase text-stone-200 sm:px-6">
//* nothing will change because sm:px-4 has nothing to override on.

//* so change it to <div className="bg-stone-800 px-4 py-4 uppercase text-stone-200 sm:px-6">
//* so sm:px-4 can override on px-4

//*==============================================================

//! Grid

// So basically what we want to do is to set up a grid

// which contains three rows for the layout.

// So one row here for the header, one for this content,

// and one for this card overview.

// The goal of that is

// that we can then easily push this overview here all the way

// to the bottom of the screen.

//^==============================================

;```
    <main className="mx-auto max-w-3xl overflow-scroll">
        <Outlet />
    </main>
``` // and it clearly doesn't have this width
// that we defined right here.

// But the reason for that is that this is now a grid item.

// So this is just how it works with CSS grid.

// So one way around this

// is that we can wrap this into another div

// like this,

```
<div className='overflow-scroll'>
        <main className="mx-auto max-w-3xl ">
            <Outlet />
        </main>
</div>``` // and then we got that fixed.
// The only thing that we need to do

// is to then make this element actually with overflow scroll.

// So let's grab that.

// And there we go.

// So now the scroll bar

// is nicely appearing here on the right side,

// and everything works nicely.

// All right.

// So let's remove this from here.

// And beautiful.

// Now we could also add the margin

// that we have in the homepage,

// so here at the top and at the bottom.

// So, let's do that here maybe.

// So we could do margin y and set it to 10 again.

// And so that would then create some nice spacing.

// But actually I want different spacing here

// at the top of the page for different pages.

// And therefore, let's define this margin here individually

// for each page and not here on this wrapper,

// so here in this layout.

// So basically all the styles that we defining right here

// will apply to all the pages

// because the pages are rendered here in this outlet

// and therefore here inside these elements.

// But of course,

// we can also set individual styles on the page level

// simply by adding some styles,

// well, to the components that make up these different pages.

//*===================================================================================
//! 302. Styling Buttons: Element States and Transitions
// Next up we're gonna take a look

// at element states such as "hover", "disabled", or "focus".

// And we will also implement CSS transitions,

// and we will do all this

// while styling some links and buttons.

//^==================
//? focus state:
// So again, when the button is focused

// we give it this yellow background color

// which is the same one as the hover one.

// So this one here.

// And then we remove the outline and give it this ring.

// And here we could also specify some values

// to make it a larger ring.

// And then here we give the ring a color and an offset.

// So a space between the ring and the element itself.

//*===========================================================================================================

//! 303. Styling Form Elements
//? open searchOrder

// in CSS, we can easily style

// the placeholder pseudo element.

// And so in Tailwind we can do the same,

// simply by Prefixing placeholder.

//^============================
// focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50

//^=====================================

//* border by default is 1px

//*===================================================================================

//! 304. Reusing Styles With @apply
// we're gonna learn how

// we can reuse some styles using Tailwind's Apply directive.

// So basically using Apply, we can create an old school class

// by composing many Tailwind classes together.
//? open: index.css

``` @layer components {
   .input{
     @apply w-full rounded-full border border-stone-200 px-4 py-2 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-opacity-50 md:px-6 md:py-3;
   }

}

``` // this input class is basically composed
// of all these Tailwind classes

// and so I can now replace this here simply with input.

// So when I give it a save,

// then it still looks exactly the same as before.

// And so let's do the same here.

// So class name of input, and also right here.

// So input and beautiful.

// So we have the same styling here now

// in all these three input fields.

// So again, simply by composing all these Tailwind classes

// together into this one new input class.

// So this looks really nice and helpful, right?

// But that doesn't mean that we should start using

// this technique all over the place now

// because basically if we started to doing this

// for all our elements,

// then we would simply go back to writing CSS

// in the old school way.

// So being back to writing classes and then applying

// those classes, so that's what we did before

// and so then there would be no point

// in using Tailwind in the first place.

// So this should really be treated

// as an exception here when there are so many classes

// that we are using all at the same time, like this year

// and when we do not want to create a new component

// because the actual better solution would be to reuse

// all of this by creating a React component.

// So for example, creating an input component

// which we could then reuse here

// in all these different places, which is actually

// what we're going to do in the next video for our buttons.

// So again, keep in mind that this way of creating new classes

// by composing many other classes together with Apply

// should really be the exception and not the rule

// because with this, we are throwing out of the window

// all of the advantages that Tailwind actually gives us.

// Well, maybe not all of them,

// but surely many of the advantages.

// But of course, I still wanted you to know

// about this technique because it is still

// an important technique that you might see used

// in Tailwind in some situations.

// But now in the next lecture,

// we will actually reuse some other styles.

// So in particular this button here.

// So all of this year we will try to reuse this

// using React components which is indeed the better way

// of reusing styles.

//*========================================================================================================

//! 305. Reusing Styles With React Components
//? open CreateOrder.jsx

//? create Button comp in ui folder.

//* Use the created Button comp in CreateUser.jsx

//? open Error and cart
//* to reuse the link style

//^=============
//* in Cart comp there is (order now) link:  <Link to="/order/new">Order pizzas</Link>
//* and we want to make this link as link and button

//*==============================================================================

//! 306. Absolute Positioning, z-index, and More

//? open AppLayout.jsx - Loader.jsx - index.css

//? style the loader

// in order to format the loader,

// let's actually always display it.

// So, let's comment this one out.

// And here, let's just say true.

// And so with this, the loader will basically always be there.

// So, what we want with this loader is

// that it basically will cover the entire page here,

// sitting kind of in the middle here.

// So, on top of everything else,

// and also adding a small background blur.

// So, the way we can achieve this with CSS is

// to basically add one parent element around this loader here,

// and then absolutely position that element here

// in this top left corner and making it so

// that it occupies the entire page.

//*==============================================================================
//! 307. Configuring Tailwind: Custom Font Family
//? open config file:  tailwind.config

// 100 D.V.H

// which stands for dynamic viewport height units.

// And so with this, we no longer have the problem

// that on mobile browsers sometimes the viewport type

// is not really 100%.

//*=================================================================================

//! 308. Styling the Menu

//? open: menuItem.jsx

//* we can use space class as in CartOverview in order to create some space
//* between the child elements.

//* And with divide class, we can create a line between child elements.
//* apply it on ul element to make lines between li elements.

//! problem:
```
//* if you add space-y-2, so the dividing line won't be in the middle
//* so instead: add py-2 to li element (menuItems themselves) instead of ul element
<ul className="space-y-2 divide-y divide-stone-200 px-2">
{menu.map((pizza) => (
    <MenuItem pizza={pizza} key={pizza.id} />
))}
</ul>
```

//? open CreateUser - CreateOrder - MenuItems - Cart
//* to add type prop to the button comp

// the technique that I'm going to use

// is to create an object here with the styles

// and then based on the type,

// we will get the style from the object.

//*=================================================================================

//! 309. Styling the Cart

//? open: cart - cartItem

//*=================================================================================
//! 310. Styling the Order Form

//? open: CreateOrder.jsx

//^ emoji as a favicon (google it and get it from css-tricks website)
//* <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎯</text></svg>">

//*=================================================================================

//! 311.

//? open: order.jsx
