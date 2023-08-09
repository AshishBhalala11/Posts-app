import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import CreatePostPage from "../pages/CreatePostPage";
import PostDetailPage from "../pages/PostDetailPage";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create",
    element: <CreatePostPage />,
  },
  {
    path: "/posts/:postId",
    element: <PostDetailPage />,
  },
  {
    path: "*",
    element: <Home />,
  },
]);
