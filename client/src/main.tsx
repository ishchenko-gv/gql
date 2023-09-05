import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import BooksPage from "./pages/BooksPage";
import BookPage from "./pages/BookPage";
import AuthorsPage from "./pages/AuthorsPage";
import AuthorPage from "./pages/AuthorPage";

const link = createHttpLink({
  uri: "http://localhost:5005/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "authors",
        element: <AuthorsPage />,
      },
      {
        path: "author/:id",
        element: <AuthorPage />,
      },
      {
        path: "/books",
        element: <Navigate to="/books/1" />,
      },
      {
        path: "books/:page",
        element: <BooksPage />,
      },
      {
        path: "book/:id",
        element: <BookPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
