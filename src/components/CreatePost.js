import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// import Loader from './Loader';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const [isPostCreated, setIsPostCreated] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // setLoading(true);
    setError(null); 
    const newPost = { title, body };
    axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
      .then(response => {
        console.log('Post created successfully:', response.data);
        setIsPostCreated(true);
        // setLoading(false);
      })
      .catch(error => {
        console.error('Error creating post:', error);
        setError('An error occurred while creating the post.');
        // setLoading(false);
      });
  };

  // if (loading) {
  //   return <Loader />;
  // }

  if (isPostCreated) {
    setTimeout(() => {
      navigate('/');
    }, 2000);
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Post Created</h1>
        <p>Your post has been successfully created!</p>
        <span>You will be redirect to list page shortly. If not </span>
        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Click here
        </Link>
        <span> to go back to list page.</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Create New Post</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-semibold">Title</label>
          <input
            type="text"
            id="title"
            className="border p-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block font-semibold">Description</label>
          <textarea
            id="body"
            className="border p-2 w-full"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={1000}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Post
        </button>
      </form>
      <button
        className="bg-gray-200 text-gray-800 px-4 py-2 rounded mt-4"
        onClick={() => navigate('/')}
      >
        Go Back
      </button>
    </div>
  );
};

export default CreatePost;
