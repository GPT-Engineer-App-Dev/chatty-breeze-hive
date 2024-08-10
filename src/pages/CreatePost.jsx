import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const createPost = async (postData) => {
  // Simulating API call
  console.log('Creating post:', postData);
  return { id: Date.now(), ...postData };
};

const CreatePost = () => {
  const { register, handleSubmit, formState: { errors }, control } = useForm();
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
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter your post title"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="subreddit">Subreddit</Label>
              <Select {...register("subreddit", { required: "Subreddit is required" })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a subreddit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="r/funny">r/funny</SelectItem>
                  <SelectItem value="r/AskReddit">r/AskReddit</SelectItem>
                  <SelectItem value="r/gaming">r/gaming</SelectItem>
                  <SelectItem value="r/aww">r/aww</SelectItem>
                  <SelectItem value="r/pics">r/pics</SelectItem>
                </SelectContent>
              </Select>
              {errors.subreddit && <p className="text-red-500 text-sm">{errors.subreddit.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your post content here"
                {...register("content", { required: "Content is required" })}
                className="min-h-[200px]"
              />
              {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL (optional)</Label>
              <Input
                id="image"
                placeholder="Enter image URL"
                {...register("image")}
              />
            </div>
            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? 'Creating...' : 'Create Post'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePost;