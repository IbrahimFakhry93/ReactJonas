import { createContext, useContext, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { PostProvider, usePosts } from "./PostContext";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}
//& Video 225 Advanced Pattern: A Custom Provider and Hook (App v-3 )

//^ Refactoring State Management
//? Removing State and Logic from Component
//* The idea is to remove all the state and state updating logic from this component.

//? Custom Context Provider Component
//* We will place it into our own custom Context Provider component.

//? Providing State Using Context
//* We will then have all the state and provide that using context into our application.

//? Refactoring Existing Code
//* This is basically just a refactoring of what we already have.
//* The functionality will stay exactly the same.

//? Three Parts of Context
//* We will still have all three parts - creating the context, providing a value, and reading it.

//? Different Parts in Different Files
//* We will just have these different parts in different files.

//^ Create PostContext.js (Create PostProvider Comp)

//~ means encapsulate this repeated part (useContext(PostContext)) in every comp in a custom hook:
//* const { onClearPosts } = useContext(PostContext),  const { posts } = useContext(PostContext);

function App() {
  // const x = usePosts();
  // console.log(x); //! undefined, because we use context outside the context provider (PostProvider)

  const [isFakeDark, setIsFakeDark] = useState(false);
  //! App Effects
  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );

  return (
    <section>
      <button
        onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
        className="btn-fake-dark-mode"
      >
        {isFakeDark ? "☀️" : "🌙"}
      </button>
      <PostProvider>
        <Header />
        <Main />
        <Archive />
        <Footer />
      </PostProvider>
    </section>
  );
}

//*===========================================

//~ 4) consume Context   (1, 2, 3 in PostContext.js)
function Header() {
  // const { onClearPosts } = useContext(PostContext);

  //~ consume Context
  const { onClearPosts } = usePosts(); //* after importing usePosts custom hook

  console.log(onClearPosts);
  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results />
        <SearchPosts />
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  );
}
//*===========================================
function SearchPosts() {
  //~ consume Context
  const { searchQuery, setSearchQuery } = usePosts();
  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
}
//*===========================================
function Results() {
  const { posts } = usePosts();
  return <p>🚀 {posts.length} atomic posts found</p>;
}
//*===========================================
function Main() {
  return (
    <main>
      <FormAddPost />
      <Posts />
    </main>
  );
}
//*===========================================
function Posts() {
  return (
    <section>
      <List />
    </section>
  );
}
//*===========================================
function FormAddPost() {
  const { onAddPost } = usePosts();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!body || !title) return; //* if title or body their input values haven't entered by user, prevent App from submitting
    onAddPost({ title, body });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post body"
      />
      <button>Add post</button>
    </form>
  );
}
//*===========================================
function List() {
  const { posts } = usePosts();
  return (
    <ul>
      {posts.map((post, i) => (
        <li key={i}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}
//*===========================================
function Archive() {
  const { onAddPost } = usePosts();
  const [posts] = useState(() =>
    // 💥 WARNING: This might make your computer slow! Try a smaller `length` first
    Array.from({ length: 10000 }, () => createRandomPost())
  );

  const [showArchive, setShowArchive] = useState(false);

  return (
    <aside>
      <h2>Post archive</h2>
      <button onClick={() => setShowArchive((s) => !s)}>
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>

      {showArchive && (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <p>
                <strong>{post.title}:</strong> {post.body}
              </p>
              <button onClick={() => onAddPost(post)}>Add as new post</button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
//*===========================================
function Footer() {
  return <footer>&copy; by The Atomic Blog ✌️</footer>;
}
//*===========================================
export default App;
