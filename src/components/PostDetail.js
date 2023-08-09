import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => {
        setPost(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching post details:', error);
        setLoading(false);
      });
  }, [postId]);

  if (loading) {
    return (
      <Loader />
    );
  }

  if (!post) {
    return <div>Error fetching post details.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-4 rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4">{post.title}</h1>
        <div className="grid gap-2">
          <DetailItem title="Post ID" value={post.id} />
          <DetailItem title="User ID" value={post.userId} />
          <DetailItem title="Description" value={post.body} />
        </div>
        {/* <p className="text-gray-700 mt-4">{post.body}</p> */}
        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Back to Posts
        </Link>
      </div>
    </div>
  );
};

const DetailItem = ({ title, value }) => (
  <div className="flex">
    <p className="text-gray-600 font-semibold">{title}:</p>
    <p className="text-gray-700 ml-2">{value}</p>
  </div>
);

export default PostDetail;
