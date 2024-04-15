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
</div>```

// and then we got that fixed.

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
