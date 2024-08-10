import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpCircle, ArrowDownCircle, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Comments from '@/components/Comments';

const fetchPosts = async () => {
  const response = await fetch('https://www.reddit.com/r/popular.json');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  const data = await response.json();
  return data.data.children.map(post => ({
    id: post.data.id,
    title: post.data.title,
    content: post.data.selftext,
    votes: post.data.ups,
    comments: post.data.num_comments,
    author: post.data.author,
    subreddit: post.data.subreddit_name_prefixed,
    thumbnail: post.data.thumbnail,
  }));
};

const Home = () => {
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
  const [expandedPost, setExpandedPost] = useState(null);

  if (isLoading) return <div className="text-center mt-8">Loading posts...</div>;
  if (isError) return <div className="text-center mt-8 text-red-500">Error fetching posts</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Reddit Clone</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="w-full">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <div className="text-sm text-gray-500">
                Posted by {post.author} in {post.subreddit}
              </div>
            </CardHeader>
            <CardContent>
              {post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default' && (
                <img src={post.thumbnail} alt={post.title} className="mb-4 rounded-md mx-auto object-cover" />
              )}
              <p className="mb-4">{post.content}</p>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <ArrowUpCircle className="mr-2 h-4 w-4" />
                  Upvote
                </Button>
                <span className="font-bold">{post.votes}</span>
                <Button variant="outline" size="sm">
                  <ArrowDownCircle className="mr-2 h-4 w-4" />
                  Downvote
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {post.comments} comments
                </Button>
              </div>
              {expandedPost === post.id && (
                <Comments postId={post.id} />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;