//! 346. What is React Query?

//* Slides

//*======================================================

//! 347. Setting Up React Query

//* npm i @tanstack/react-query@4

//^ open App.jsx

//& Title: Setting up React Query in App.jsx
//~ Step 1: Create a place where the data lives
//* - This is similar to what we did with the Context API or Redux.
//* - In the case of React Query, we set up the cache and the Query client using "new QueryClient."

//* const queryClient = new QueryClient({});

//? staleTime
//* - "staleTime" is the amount of time that the data in the cache will stay fresh until it is refetched again.

//? Note:
//* - With this, we have created our "QueryClient," which sets up the cache behind the scenes.

//~ Step 2: Provide this to the application
//* - We want to provide our Query data to the entire application tree.
//* - We make this a parent component of our entire tree and pass the created client
//* as a prop to the provider component.

//* npm i @tanstack/react-query-devtools

//*================================================================================

//! 349. Fetching Cabin Data

//* So instead of manually fetching the data in a use effect as we did in Cabins.jsx
//* We will now let React Query do this work

//^ open: CabinTable.jsx - CabinRow.jsx - apiCabins.js - Cabins.jsx - helpers.js - App.jsx

// function CabinTable() {
//   const x = useQuery({
//     queryKey: ["cabins"],
//     queryFn: getCabins,
//   });

// console.log(x)

//* useQuery hook: it is used to fetch and store data in the cache

//* queryKey:
//* It will uniquely identify this data that we're going to query.
//* we would use useQuery again on another page with this exact key,
//* then the data would be read from the cache.

//* queryFn:
//* this is the function is responsible for querying.
//* So basically for fetching the data from the API.
//* and the function that we specify here (ex. getCabins)
//* need to return a promise same as in getCabins function,
//* and this promise will resolve and return this data.
//* we use it instead of using fetch(url)

//* in console: you will find isLoading, status
//* you can use status instead of isLoading and it changes to success, loading

//* role = table , role = row
//* to make <Table></Table> and <TableHeader></TableHeader>
//* to function as a table, even we use div not table html element
{
  /* <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div></div>
      </TableHeader>

      {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </Table> */
}
//}

//* popular library for manipulating and for doing calculations with dates.
//* npm i date-fns

//& Title: Understanding React Query Caching Mechanism
//* React Query's caching mechanism allows data to persist even when a component unmounts.
//* This is different from traditional data fetching with useEffect,
//* where data would need to be refetched each time a component mounts.

//? Moving Away from a Component
//* When we navigate away from a component (like CabinTable), the component unmounts
//* and the state associated with it (like cabins data) "cabins" becomes inactive in React Query devtools

//? Returning to a Component
//* If we navigate back to the component,
//* the same data is displayed again without a new fetch request.
//* This is because the data was cached from before, so there's no loading spinner this time.

//? Initial Data Fetch
//* If we load a page for the first time and the data isn't in the cache yet,
//* it needs to be fetched.
//* This triggers a loading spinner, and the fetched data gets stored in the cache.

//? Data Persistence in Cache
//* Even when we navigate away and the component unmounts, the data stays in our cache.
//* This is a key feature of React Query.

//? Comparison with useEffect
//* Traditionally, if we were fetching data using a useEffect hook,
//* the data would need to be refetched each time we navigate back to the page.
//* But with React Query, the data is already there in the cache,
//* eliminating the need for a new fetch.

//^ open App.jsx:

// const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//! staleTime: 60 * 1000,
//      //*   staleTime: 0,
//       },
//     },
//   });

//* the time that it takes until the data becomes old, so until it becomes stale,

//* And so what staleTime = 0 this means is that now the data will always automatically become stale.

//* So now the data is always invalid. So as soon as something here changes and we come back,

//* it will immediately then re-fetch that.

//? always make staleTime = 0;
//*================================================================================

//! 350. Mutations: Deleting a Cabin

//* let's learn how we can use the power of React Query to Delete a cabin
//* and automatically re-render the user interface.

//^ open: apiCabins - CabinRow

//* you have to change row level security policies to be able to delete a cabin

//& Title: React Query Mutation

//? Cache Invalidation
//* The cache is need to invalidate as soon as this mutation (delete cabin) is done.
//* as soon as we invalidate this cache, so this data with this key  queryKey: ["cabins"],
//* will immediately fetch again. Because as the name says,
//* this data is then invalid or the Query is invalid.

//? onSuccess Callback function
//* We specify the "onSuccess" callback for this purpose.
//* "onSuccess" accepts a function.

//? Post-Mutation Actions
//* Here we can instruct React Query on what to do post-mutation.
//* when the mutation is successful at this point.

//? Data Re-fetching
//* What do we want to do next?
//* We want to re-fetch the data in this situation.

//? Manual Cache Invalidation
//* This is achieved in React Query by invalidating the cache.
//* We can actually do this manually as an experiment only on react query devtools.

//* "invalidateQueries" function actually needs to be called on the "queryClient."
//* by using special hook useQueryClient()

// queryClient.invalidateQueries({
//   queryKey: ["cabins"],
// });

//* queryKey value same as queryKey specified in useQuery hook object (look on CabinTable.jsx)

//* onError receives error that was thrown in deleteCabin function (look on deleteCabin CabinRow and apiCabins)

//* React Query actually tries to fetch multiple times whenever there's an error,
//*================================================================================

//! 351. Displaying Toasts (Notifications)

//* npm i react-hot-toast

//^ CabinRow, apiCabins, AppLayout

//*=================================================================================

//! 352. Introducing Another Library: React Hook Form

//^ open: CreateCabinForm.jsx  - Cabins.jsx  - apiCabins.jsx

//* npm i react-hook-form@7

//? {...register("description")}

//* this register here can become a bit more complex by adding some validators and we can then also

//* handle the results of an error when submitting the form.

//* note: handleSubmit function is called each time we attempt to submit the form
//*=================================================================================

//! 353. Creating a New Cabin

//^ open: apiCabin.js

//* change policy to allow all users to create and update on SupaBase

//* authentication => cabins => create policy => enable read access for all users => Choose policy command insert
//* write expression true => save policy
//* same for update, write expression true => save policy.

//* While we will change the cabin data by enter new values by form
//* so we need to use  (useMutation)

//& Title: Understanding React Query Mutation and Invalidation
//? React Query Mutation:
//* - Whenever a mutation (like createCabin) happens, we want to invalidate the cabin's query.
//* - This is because right after submitting the form and creating a new cabin, we want it to appear in the UI.

//? Invalidation and Refetching:
//* - Invalidation triggers a refetch of the cabin's data.
//* - This means that the CabinTable component will re-fetch the cabin's data whenever a mutation occurs.

//? React State and Re-rendering:
//* - The cabin state is just React state behind the scenes.
//* - When new data is fetched by React Query and the state updates, the component re-renders.
//* - So, when the cabins state changes, it triggers a re-render of the table.

//*=================================================================================

//! 354. Handling Form Errors
//* So probably where React hook form shines the most is in form error validation.

//? Handling Form Submission Error:

// const { register, handleSubmit, reset, getValues, formState } = useForm();
// const { errors } = formState;
{
  /* <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This Field is required",
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow> */
}
//^ open: AppLayout.jsx

//* make only the main part scroll while the rest of layout stay in place.

//^ CreateCabinForm.jsx

//? validation:
//* add validation object to register function.

//* handleSubmit function is called each time we attempt to submit the form and all our validations will be executed.

//* And in case that there is one error
//* in one of the validations, then handleSubmit will not call
//* this onSubmit function here, but instead it'll call the second function
//* that we pass in here. So let's call it onError.

//* if you specify min value in the validation, and value entered below the min
//* so it will console error too.

//! Two types of errors are handled in CreateCabinForm function in CreateCabinForm component:
//* Mutation error inside useMutation
//* Submission Error that comes from fromState from useForm hook

//^================

//* apply abstraction:
//^ create FormRow component

//* label and input are connected by Id,
//* means whenever selects label we select the input.
{
  /* <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          //* id="name"
          {...register("name", {
            required: "This Field is required",
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow> */
}

//*========================================================================================================

//! 355. Uploading Images to Supabase

//^ open: CreateCabinForm.jsx - fileInput.jsx

//& Title: Handling File Uploads

//? In this video, we'll manage file uploads and send images to a Superbase bucket.

//* To make this part of the form functional, we'll handle uploading cabin photos.

//* Now, let's dive into the details of the fileInput component we created earlier.

//* This component is essentially another input element, specifically for files.

//* Since it's designed as a file input, it should automatically handle file selection.

//* We don't need to manually specify the type each time we use this component.

//* With styled components, we can achieve this seamlessly.

//* After declaring that this input field exists, we can set its attributes.

//* Here, we'll set the type attribute to "file."

//? note:

//* name of id of the input fields must correlate with the name of the columns in supabase

//* Go to OnSubmit function

// function onSubmit(data) {
//   console.log(data);

//~ data in the console as this:
```{
  "name": "002",
  "maxCapacity": "2",
  "regularPrice": "2",
  "discount": "2",
  "description": "dwds",
  "image":FileList
      "0":File {name: 'cabin-006.jpg', lastModified: 1684508687000, lastModifiedDate: Fri May 19 2023 08:04:47 GMT-0700 (Pacific Daylight Time), webkitRelativePath: '', size: 262253, …}
}```;
//   mutate({ ...data, image: data.image.at(0) });

// }

//^ open: apiCabins.js

//* Go to CreateCabin function:

//* 1) Create Cabin
//* 2) then if cabin creation is success, upload the image

//* we still need to do is to actually specify the image path here in this new cabin that we create.
//*

//* create imageName, create imagePath
//* go to supabase javascript documentation then storage then upload file
//* but first create new policy in buckets because to upload a file
//* we need a RLS POLICY PERMISSION

//^ open: Supabase.js and export supabaseUrl

//* https://dbxshcsearexonqnmrwr.supabase.co/storage/v1/object/public/cabin-images/0.26401972249044037-cabin-006.jpg
//* https://dbxshcsearexonqnmrwr.supabase.co/storage/v1/object/public/cabins-images/0.26401972249044037-cabin-006.jpg

//*===============================================================================

//! 356. Editing a Cabin

//^ open: CabinRow v-2.jsx after we duplicated it

//* Use the pre builded form for cabin creation again to edit a pre created cabin

//* First, add edit button in the cabin row

//* second, temporarily create a state variable (showForm) toggled by the edit button
//* which, if showForm is true, it will display the form right below a clicked row.

//* Third, we need to pre-fill input filed values with the data from the current cabin
//* so pass that data (cabin) into cabin form (CreateCabinForm component) as prop (CabinToEdit)

//& Title: Toggling State in React Components

//? Note:
//* When toggling state in a React component, consider two approaches:

//~ 1. Direct Toggle:
//*   - Use () => setShowForm(!show) to directly negate the 'showForm' state.
//*   - Concise and recommended for simple boolean toggling.

//~ 2. Functional Update:
//*   - Use () => setShowForm((show) => !show) to ensure the latest state value.
//*   - Useful when the new state depends on the previous state.
//*   - Ensures correctness even with rapid state updates.

//* Choose based on readability and context in your specific use case
//~===========================================================================

//^ open: CreateCabinForm v-2.jsx after we duplicated it

//* Receive cabinToEdit and assign as a default value to an empty object,
//* because this data (editValues) sometimes are not existed
//* then get some data out of cabinToEdit and rename the id to be more clear and readable

//? Refill the form inputs before edit
//* get the editValues into the input fields by defaultValues in React Hook Form
//* by passing options object to useForm and get defaultValues
// const { register, handleSubmit, reset, getValues, formState } = useForm({
//   defaultValues: isEditSession ? editValues : {},
// });
//? Check for editing cabin status:
//* If we are just using this form to create a new cabin, then we will not want any default values.
//* And therefore, first of all, let's actually figure out if we are using this form to edit
//* or to add a new cabin. So let's create a variable (isEditSession) which will contain that information.
//* And then, let's simply convert the editId to a Boolean.
//* So basically if there is an editId, then this will become true.
//* And if it's not, then the Boolean will convert it to false.
// const isEditSession = Boolean(editId);

//? File upload
//* usually when we edit cabin's data here we simply want the image to stay the same.
//* So, in this case, we want to be able to submit this form here
//* without actually having this photo. And so this should then not be required in this case.

//~ We made this cabin photo upload here optional for the editing session.

//* so isEditSession to return false to image required, while editing the cabin

```<FileInput
id="image"
accept="image/*"
{...register("image", {
 //! required: isEditSession ? false: "This Field is required",
})}
/>```;

//^ open: apiCabins:

//* Reuse the createCabin function to edit the cabin but rename it to CreateEditCabin
//* rename the import name in CreateCabinForm
//! add .select().single to insert function
//! why?
// by default, this insert function right here

// when we create a new row in the table

// will not immediately return that row.

// All right, so many times we actually do need that

// and we do return the data actually from this function.

// But right now that data will be empty.

// And so if we want to actually return

// that newly created object,

// here we need to attach .select,

// and then we can also attach .single

// which will then basically take that new element

// out of the array that it will be in.

//~  if we want to edit a cabin, then we need to pass in the new cabin data
//~ plus the ID of the cabin that is being edited. And so that's how we will know
//~ if we are in an edit session or not.

//* export async function createEditCabin(newCabin, id)

//! So we want to create the cabin here only if there is no id. So if there is no id,

//* remember how we made this cabin photo upload here optional for the editing session.
//* This means that sometimes when we edit the cabin we will get a new file,
//* so if we select one of cabin photos stored in src => data folder => cabins,
//* but if not, we will just get a photo URL we get from Supabase

//? Two different situations that we need to account for:

//* 1) Update the cabin without specifying (uploading) a new cabin photo

//~ here in console.log (data in onSubmit(data) function, the image will have the image path that we specified earlier
//~ ex.: image: "https://dbxshcsearexonqnmrwr.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg"

//* 2) Update the cabin and specifying (uploading) a new cabin photo
//~ the image in the console will be assigned to fileList

//* so to account for those both two situations, we need to create a variable (hasImagePath) in
//* createEditCabin function in apiCabins to check what image is this.
//!  const hasImagePath = newCabin.image.startsWith(supabaseUrl);
// const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
// const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
//   "/",
//   ""
// );
//*  remove the slash: because if this cabin name contains any slashes, then super base will create folders based on that.

//? const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;
//* cabins-images: name of the bucket
//* imagePath url form, we get from the url in the created bucket in Supabase then we make it generic as above
//~ use optional chaining
//* because image might not be a string so we can not call .startsWith  method
//* const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

//? note:
//* mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData,id),
//* in the mutation function. in React Query,
//* we can actually only pass one element to this function.
//* but so let's create an arrow function here.
//* And only accept exactly one argument
//* which will be this object with the newCabinData, And also the id.
//* And so then we immediately destructure that  and pass it in the function as necessary.
//* Create isWorking variable and use it for disabled attribute for input

//? Account for different image property values while editing:
// now it's time to again account for the fact that the image
// can either be this string right here
// or it can be this object that we saw earlier.
// So this image file list right there.
// So this array basically.
// So let's check for that
// so that we can actually determine what image
// we need to pass into editCabin.
// So here we can use the type of operator
// to check whether data.image
// is a string.
// And so if it is a string,
// then the image will just become data.image.
// And otherwise, so if it is that file list,
// then we will again need the data
// to be data.image at position zero.

// const image = typeof data.image === "string" ? data.image : data.image[0];
// if (isEditSession)
//   editCabin({ newCabinData: { ...data, image }, id: editId });
// else createCabin({ ...data, image: image });

//*====================================================================================================

//! 357. Abstracting React Query Into Custom Hooks

//^ create: useDeleteCabin in cabins folder
// we didn't place

// this hook into this hooks folder because this one

// is really only for hooks that are reusable

// across multiple features, but this one here

// really is related to the cabin's feature

//^ open: CabinRow.jsx after we duplicate it

//^ open: CreateCabinForm.jsx

//* reset() problem:

// we can not only use the on success handler

// here on use mutation but also right where the mutation

// actually happens, or in other words

// we can also pass a similar thing right here

// into the mutation function which in this case

// we renamed to create cabin but that's the same thing

// so this is just simply the mutate function

// that is coming from React query so basically

// that is coming from right here

// so it's the result of use mutation and so again we can

// place this on success handler function

// not only right here but also right in the function

// where the mutation actually happens (inside createCabin look at onSubmit function)

// so all we need to do is to pass in an object of options

// and so then there we can do on success

// and then here we can very simply call the reset function

// and also this call back right here

// actually gets access to the data

// that the mutation function returns

// or in other words we can here get access

// to this new cabin data that we return right here

// and so this data again is going to be the newly created

// cabin or the edited one so just to see that here

//~==========

// this call back in onSuccess (look down)

// actually gets access to the data

// that the mutation function returns

// or in other words we can get access

// to this new cabin data that we return in  createEditCabin function in apiCabins

// and so this data again is going to be the newly created

// cabin or the edited one

```function onSubmit(data) {
  console.log(data);
  const image = typeof data.image === "string" ? data.image : data.image[0];
  if (isEditSession)
    // editCabin({ newCabinData: { ...data, image }, id: editId });
    editCabin({ newCabinData: data, id: editId });
  else
    createCabin(
      { ...data, image: image },
      { 

        //! this callback
        onSuccess: (data) => {
          reset();
          console.log(data);
        },
      }
    );
  }```;

//^ create: useEditCabin.js

//^ open: CabinTable.jsx

// so now if for some reason we need this data (cabins)

// somewhere else, it's as easy as just grabbing this
//   const { isLoading, cabins } = useCabins();

// and then for example, well let's say for some reason

// we need this in the sidebar,

//^ oepn Sidebar.jsx
