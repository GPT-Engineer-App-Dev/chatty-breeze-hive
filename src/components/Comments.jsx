import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const fetchComments = async (postId) => {
  // In a real app, you'd fetch comments from an API
  // For now, we'll return mock data
  return [
    { id: 1, author: 'user1', content: 'Great post!', avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=user1' },
    { id: 2, author: 'user2', content: 'I disagree with this.', avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=user2' },
    { id: 3, author: 'user3', content: 'Interesting perspective.', avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=user3' },
  ];
};

const Comments = ({ postId }) => {
  const { data: comments, isLoading, isError } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
  });

  if (isLoading) return <div>Loading comments...</div>;
  if (isError) return <div>Error loading comments</div>;

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="flex items-start space-x-4 pt-4">
              <Avatar>
                <AvatarImage src={comment.avatar} alt={comment.author} />
                <AvatarFallback>{comment.author[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{comment.author}</p>
                <p className="text-gray-600">{comment.content}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Comments;