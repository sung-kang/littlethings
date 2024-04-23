import useAuthContext from '@/hooks/useAuthContext';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

import * as littlethingsApi from '@/api-client/userApi';
import { options, Post } from '@/api-client/homepageutility';
import NewLittleThingForm from './NewLittleThingForm';
import { Button } from '@/components/ui/button';
import { TrashIcon } from '@radix-ui/react-icons';

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useAuthContext();
  const [deletable, setDeletable] = useState(false);
  const [create, setCreate] = useState(false);
  console.log(deletable, create);

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
    const success = await littlethingsApi.deletePost(postId);
    if (success) {
      setPosts((posts) => posts.filter((post) => post.id !== postId));
    }
  };

  const getPostsHandler = async () => {
    const data = await littlethingsApi.getAllPosts();
    setPosts(data);
  };

  return (
    <>
      <div className=" flex justify-center items-center mt-14">
        <h1 className="text-5xl font-bold text-gray-800">
          <span className="text-lt-green-2">Little</span> Things
        </h1>
      </div>
      <div className="flex justify-end items-end ">
        <div className="flex">
          <Button
            onClick={deleteButtonState}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-3 border border-gray-400 rounded shadow"
          >
            <TrashIcon />
          </Button>
        </div>
      </div>

      <div className="flex justify-center items-center transition-opacity duration-500">
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6  ">
          {posts.map((post) => (
            <div
              key={post.id}
              className={clsx(
                'flex flex-col justify-center items-center bg-white/30 border border-white rounded-lg p-10 my-5 shadow-lg backdrop-blur-md hover:backdrop-blur-lg transition duration-300 ease-in-out',
                { 'wiggle-animation': deletable }
              )}
            >
              <div>Littlething: {post.littlething}</div>
              <div>Description: {post.description}</div>
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

          <NewLittleThingForm
            handleOpen={handleOpen}
            handleClose={handleClose}
            setPosts={setPosts}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
