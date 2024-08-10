import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const createPost = async (postData) => {
  // Simulating API call
  console.log('Creating post:', postData);
  return { id: Date.now(), ...postData };
};

const CreatePost = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success('Post created successfully!');
      navigate('/');
    },
    onError: () => {
      toast.error('Failed to create post. Please try again.');
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create a New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                placeholder="Post Title"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <Textarea
                placeholder="Post Content"
                {...register("content", { required: "Content is required" })}
              />
              {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
            </div>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Creating...' : 'Create Post'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePost;