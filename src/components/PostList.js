import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    setLoading(true);
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts?_start=${startIndex}&_limit=${postsPerPage}`
      )
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setError("An error occurred while fetching posts.");
        setLoading(false);
      });
  }, [currentPage]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-semibold">List of Posts - </h1>
        <Link
          to="/create"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-2"
        >
          Create Post
        </Link>
      </div>
      {error ? (
        <div className="text-red-600 mb-4">{error}</div>
      ) : (
        <>
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4">{post.id}</td>
                  <td className="py-2 px-4">
                    <Link
                      to={`/posts/${post.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="py-2 px-4">{post.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-center">
            <button
              className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() =>
                setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
              }
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-2 ${
                posts.length < postsPerPage
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
              disabled={posts.length < postsPerPage}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostList;
