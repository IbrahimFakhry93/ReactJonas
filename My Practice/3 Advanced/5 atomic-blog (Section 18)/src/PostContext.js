import { createContext, useContext, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

//! video 225: Advanced Pattern: A Custom Provider and Hook (App v-3 )

//* Lecture first part:  (Create PostProvider Comp)
//* Lecture second part: (Create our own custom hook) inside

//~ That's a very common pattern by developers:
//* So basically placing this Context Provider component
//* and then the corresponding hook all into the same file.

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

//! App Context:
const PostContext = createContext(); //* PostContext in capital letter because it is component
console.log(PostContext);

//& Place all the states and all states update logic in separate context
function PostProvider({ children }) {
  //! App States
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  //! Derived state
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        searchQuery: searchQuery,
        setSearchQuery: setSearchQuery,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error("Post context was used outside of the PostProvider");
  return context;
}

export { PostProvider, usePosts };
