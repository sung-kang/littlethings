import useAuthContext from '@/hooks/useAuthContext';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import clsx from 'clsx';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  createPost,
  handleDelete,
  fetchingAllPosts,
} from '@/api-client/homepage';
import { options, Post, Frequency } from '@/api-client/homepageutility';

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useAuthContext();
  const [deletable, setDeletable] = useState(false);
  const [create, setCreate] = useState(false);
  const [frequency, setFrequency] = useState<Frequency>();
  console.log(frequency);

  //include formState: {error} later
  const { handleSubmit, register } = useForm<Post>();

  useEffect(() => {
    getPostsHandler();
  }, []);

  const deleteButtonState = () => {
    setDeletable(!deletable);
  };

  const handleClose = () => {
    setCreate(false);
  };

  const handleOpen = () => {
    setCreate(true);
  };

  const deletePostHandler = async (postId: string) => {
    const success = await handleDelete(postId);
    if (success) {
      setPosts((posts) => posts.filter((post) => post.id !== postId));
    }
  };

  const createPostHandler = async (postData: Post) => {
    await createPost(postData);
    setPosts((posts) => [...posts, postData]);
  };

  const getPostsHandler = async () => {
    const data = await fetchingAllPosts();
    setPosts(data);
  };

  const handleFrequencyChange = (value: Frequency) => {
    setFrequency(value);
  };

  return (
    <>
      <div className="flex justify-center items-center mt-10">
        Welcome to your littlethings {user.firstName}
      </div>

      <button
        onClick={deleteButtonState}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        DELETE POSTS
      </button>
      <button
        onClick={handleOpen}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        CREATE POST
      </button>
      {create && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <Card>
            <CardHeader>
              <CardTitle>littlething</CardTitle>
              <CardDescription>
                Create your new littlething here
              </CardDescription>
            </CardHeader>
            <form
              onSubmit={handleSubmit(createPostHandler)}
              className="flex flex-col justify-center items-center gap-6"
            >
              <CardContent>
                <Input
                  {...register('description', { required: true })}
                  id="description"
                  type="description"
                  placeholder="description"
                />
              </CardContent>
              <CardContent>
                <Input
                  {...register('littlething', { required: true })}
                  id="littlething"
                  type="littlething"
                  placeholder="littlething"
                />
              </CardContent>
              <CardContent>
                <Select onValueChange={handleFrequencyChange} value={frequency}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Daily">Daily</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
              <CardContent>
                <Input
                  {...register('occurence', { required: true })}
                  id="occurence"
                  type="occurence"
                  placeholder="occurence"
                />
              </CardContent>
              <button
                type="submit"
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              >
                Create
              </button>
            </form>
            <button
              onClick={handleClose}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              Close
            </button>
          </Card>
        </div>
      )}
      <div
        className={clsx(
          'flex justify-center items-center transition-opacity duration-500',
          { 'opacity-50': create }
        )}
      >
        <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8 ">
          {posts.map((post) => (
            <div
              key={post.id}
              className={clsx(
                'flex flex-col justify-center items-center bg-white/30 border border-white rounded-lg p-10 my-5 shadow-lg backdrop-blur-md hover:backdrop-blur-lg transition duration-300 ease-in-out',
                { 'wiggle-animation': deletable }
              )}
            >
              <div>{post.littlething}</div>
              <div>{post.description}</div>
              <div>Frequency: {post.frequency}</div>
              <div>Occurence: {post.occurence}</div>
              <div>
                {new Date(post.createdAt).toLocaleDateString('en-US', options)}
              </div>
              {deletable && (
                <button
                  onClick={() => deletePostHandler(post.id)}
                  className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
