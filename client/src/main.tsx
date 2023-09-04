import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import BooksPage from "./pages/BooksPage";
import BookPage from "./pages/BookPage";
import AuthorsPage from "./pages/AuthorsPage";
import AuthorPage from "./pages/AuthorPage";
import ProfilePage from "./pages/ProfilePage";

const client = new ApolloClient({
  uri: "http://localhost:5005/graphql",
  cache: new InMemoryCache(),
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
