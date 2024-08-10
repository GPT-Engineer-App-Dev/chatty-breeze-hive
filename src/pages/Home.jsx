import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpCircle, ArrowDownCircle, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const fetchPosts = async () => {
  // Simulating API call
  return [
    { id: 1, title: "First post", content: "This is the content of the first post", votes: 10, comments: 5 },
    { id: 2, title: "Second post", content: "This is the content of the second post", votes: 7, comments: 3 },
    { id: 3, title: "Third post", content: "This is the content of the third post", votes: 15, comments: 8 },
  ];
};

const Home = () => {
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

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
            </CardHeader>
            <CardContent>
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
                <Link to={`/post/${post.id}`} className="flex items-center">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {post.comments} comments
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;