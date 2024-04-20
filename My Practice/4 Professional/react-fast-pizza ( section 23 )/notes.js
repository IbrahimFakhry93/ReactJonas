//& 295. Setting Up Tailwind CSS

//* npm install -D tailwindcss postcss autoprefixer
//* npm install -D tailwindcss@3  postcss autoprefixer
//* npx tailwindcss init -p  : create the Tailwind  and the post CSS config files.

//? open: tailwind.config.js
//* In this file we tell Tailwind where or index HTML file is located
//* and also where all or JavaScript files are located.
//* So by default they are inside this source folder
//* but if for some reason we changed all of this right here
//^  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//* then we would also have to change this config.

//^=============================================================================

//? open index.css

//* copy and paste this:

// @tailwind base;
// @tailwind components;
// @tailwind utilities;
//^=============================================================================
//? open Home.jsx

//* install tailwind css intellisense vs code extension
//^ google: tailwind prettier extension => go to github link
//* npm install -D prettier prettier-plugin-tailwindcss

//* this will do is to automatically sort the order of the class names in the way that Tailwind recommends it.

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
//* we can add some classes to the body element
//* that we want every element on the page to inherit
//* or that we want to set on the entire body element.
//* So typically that is like a background color,
//* or a text color that we want the entire page to inherit.

;(
    <body class="bg-stone-100 text-stone-700">
        <div id="root"></div>
        <script type="module" src="/src/main.jsx"></script>
    </body> //^ letter spacing
    //* tracking-widest
)//* tracking-[.25rem] for custom letter spacing
//*=====================================================================

//! 298. The Box Model: Spacing, Borders, and Display

//*=====================================================================

//! 299. Responsive Design
//* By default, Tailwind comes with five breakpoints and these breakpoints are mobile first,
//* which means that they are min with media queries.
//* This means that when we're working with Tailwind,
//* it's usually a good idea to start by implementing the mobile layout. So a mobile-first design.

//* sm  => min width: 640px  (width of view port)

//^ sm:my-16
//* means whenever the width is greater than 640, then this margin (my-16) will override the default one that we had before.
//* so that these default classes without any prefix (such as. my-10) are the mobile-first classes.
//* So they apply only if there is no breakpoint (such as. sm, md) overriding them.

//^ sm:px-6
//* Don't make the mistake that many developers make,
//* which is to think that this small (sm) means
//* that this class is going to apply to small screens.
//* So that's not how it works.
//* How it works instead is that this class starts being applied
//* from this value on.
//* So from the small breakpoint on which is this 640 pixels.
//* But below that (sm === 640px) everything that we have here without the prefix will be applied.

//^===============================================
//? note:  open: CartOverview
//* <div className="bg-stone-800 p-4 uppercase text-stone-200 sm:px-6">
//* nothing will change because sm:px-4 has nothing to override on.

//* so change it to <div className="bg-stone-800 px-4 py-4 uppercase text-stone-200 sm:px-6">
//* so sm:px-6 can override on px-4

//*==============================================================

//! 301. Using CSS Grid
//? open: AppLayout.jsx
//* So basically what we want to do is to set up a grid
//* which contains three rows for the layout.
//* So one row here for the header, one for this content (main and outlet),
//* and one for this cartOverview.
//* The goal of that is that we can then easily push cartOverview all the way
//* to the bottom of the screen.

//^==============================================

//& Title: CSS Grid and Overflow Scroll
```<main className="mx-auto max-w-3xl overflow-scroll">
    <Outlet />
</main>``` //* The main element doesn't have the width we defined because it's now a grid item. That's how CSS grid works.
//? Solution: Wrapping the main element in another div
```<div className='overflow-scroll'>
    <main className="mx-auto max-w-3xl ">
        <Outlet />
    </main>
</div>

``` //
//* By wrapping the main element in a div, we fixed the width issue.
//* The next step is to make this element actually overflow scroll.

//? Implementing Overflow Scroll
//* Now the scroll bar appears nicely on the right side, and everything works as expected.

//? Adding Margin
//* We could add the margin that we have on the homepage, at the top and the bottom.
//* We could set margin y to 10 to create some nice spacing.

//? Individual Page Spacing
//* However, I want different spacing at the top of the page for different pages.
//* Therefore, let's define this margin individually for each page and not on this wrapper.

//? Applying Styles
//* All the styles that we define here will apply to all the pages
//* because the pages are rendered here in this outlet and therefore inside these elements.

//? Individual Styles
//* Of course, we can also set individual styles on the page level simply
//* by adding some styles to the components that make up these different pages.

//*===================================================================================
//! 302. Styling Buttons: Element States and Transitions
//& open: CreateOrder - Cart - Home
//* In this section, we will explore element states such as "hover", "disabled", or "focus".
//* We will also implement CSS transitions while styling some links and buttons.

//? Focus State
//* When the button is focused, we give it a yellow background color,
//* which is the same as the hover state. We then remove the outline and give it a ring.
//* We could specify some values to make the ring larger.
//* We then give the ring a color and an offset, creating a space between the ring and the element itself.

//*===========================================================================================================

//! 303. Styling Form Elements
//? open searchOrder

//* in CSS, we can easily style  the placeholder pseudo element.

//* And so in Tailwind we can do the same, simply by Prefixing placeholder.

//^============================
//* focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50

//^=====================================

//* border by default is 1px

//*===================================================================================

//! 304. Reusing Styles With @apply
//* The input class is composed of all these Tailwind classes.
//* We can replace the individual classes with this new input class.
//* The styling remains the same.

//? Applying the new class
//* We apply the new input class to all three input fields. The styling is now consistent across all fields.

//? Caution: Use of @apply
//* While this technique is helpful, it should not be used everywhere.
//* If we start doing this for all our elements, we would simply go back to writing CSS in the old school way.
//* This should be treated as an exception when there are many classes that we are using all at the same time.

//? Better Solution: React Component
//* The actual better solution would be to reuse all of this by creating a React component.
//* For example, creating an input component which we could then reuse here in all these different places.

//? Creating New Classes with Apply
//* Keep in mind that this way of creating new classes by composing many other classes together with Apply
//* should really be the exception and not the rule because with this,
//* we are throwing out of the window all of the advantages that Tailwind actually gives us.

//? Next Steps
//* In the next lecture, we will actually reuse some other styles.
//* In particular, this button here. We will try to reuse this using React components
//* which is indeed the better way of reusing styles.

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
//? Files to Open: AppLayout.jsx, Loader.jsx, index.css

//? Styling the Loader
//* To format the loader, let's always display it.
//* We can do this by setting the condition that displays the loader to true. With this, the loader will always be there.

//? Desired Loader Style
//* We want the loader to cover the entire page, sitting in the middle, on top of everything else, and adding a small background blur.

//? Implementing the Style
//* We can achieve this with CSS by adding a parent element around the loader.
//* We then absolutely position that parent element in the top left corner and make it occupy the entire page.

//*==============================================================================
//! 307. Configuring Tailwind: Custom Font Family
//? open config file:  tailwind.config

//* 100 D.V.H which stands for dynamic viewport height units.
//* And so with this, we no longer have the problem that on mobile browsers sometimes the viewport type
//* is not really 100%.

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
//* to add type prop to the button comp the technique that I'm going to use
//* is to create an object here with the styles and then based on the type,
//* we will get the style from the object.

//*=================================================================================

//! 309. Styling the Cart

//? open: cart - cartItem

//*=================================================================================
//! 310. Styling the Order Form

//? open: CreateOrder.jsx

//^ emoji as a favicon (google it and get it from css-tricks website)
//* <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎯</text></svg>">

//*=================================================================================

//! 311. Styling the Order Overview

//? open: order.jsx
