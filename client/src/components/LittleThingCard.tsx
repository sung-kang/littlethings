import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import clsx from 'clsx';
import * as littlethingsApi from '@/api-client/littlethingsApi';
import { Dispatch, SetStateAction, useState } from 'react';
import { TimeOptions } from '@/types/LittleThingTypes';
import { Post } from '@/types/LittleThingTypes';
import { useToast } from '@/components/ui/use-toast';
import { ApiErrorType } from '@/types/Common';

interface CardComponentProps {
  post: Post;
  setPosts: Dispatch<SetStateAction<Post[]>>;
  deletable: boolean;
}

const LittleThingCard = ({ post, setPosts, deletable }: CardComponentProps) => {
  const [isHandleCompleteLoading, setIsHandleCompleteLoading] = useState(false);
  const { toast } = useToast();

  const handleComplete = async () => {
    setIsHandleCompleteLoading(true);

    try {
      const updatedCompletionCount = await littlethingsApi.patchCompletionCount(
        post.id
      );

      if (updatedCompletionCount.errors) {
        return updatedCompletionCount.errors.map((error: ApiErrorType) =>
          toast({
            variant: 'destructive',
            title: error.message,
          })
        );
      }

      setPosts((prevPosts) =>
        prevPosts.map((prevPost) => {
          if (prevPost.id === post.id) {
            return {
              ...prevPost,
              completionCount: updatedCompletionCount.message,
            };
          }
          return prevPost;
        })
      );
    } catch (error) {
      console.error('Failed to update the completion count:', error);
    } finally {
      setIsHandleCompleteLoading(false);
    }
  };

  const handleDelete = async () => {
    const deletedPost = await littlethingsApi.deletePost(post.id);

    if (deletedPost.errors) {
      return deletedPost.errors.map((error: ApiErrorType) =>
        toast({
          variant: 'destructive',
          title: error.message,
        })
      );
    }

    setPosts((posts) =>
      posts.filter((post) => post.id !== deletedPost.message)
    );
  };

  return (
    <div
      className={clsx(
        'max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 h-90 w-96 relative',
        { 'wiggle-animation': deletable }
      )}
    >
      {deletable && (
        <button
          onClick={handleDelete}
          className="w-5 h-5 absolute top-2 left-[-15px] transform -translate-y-1/2 translate-x-1/2 p-1 bg-[#CE6A6C] rounded-full shadow-lg flex items-center justify-center"
          aria-label="Delete post"
        >
          -
        </button>
      )}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xl font-medium text-gray-900 truncate dark:text-white">
          <span className="text-lt-green-2">Little</span> Thing:{' '}
          {post.littlething}
          <button
            disabled={isHandleCompleteLoading}
            onClick={handleComplete}
            className="button-splash absolute top-2.5 right-3 px-2 py-2 overflow-hidden font-medium transition-all bg-gray-200 rounded-full hover:bg-white group"
          >
            <span className="absolute inset-0 bg-lt-green-2 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            <span className="relative w-full text-left text-lt-green-3 transition-colors duration-300 ease-in-out group-hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
              </svg>
            </span>
          </button>
        </p>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        <li className="py-3 sm:py-4">
          <div className="text-sm font-medium text-gray-900 truncate dark:text-white">
            <HoverCard>
              <HoverCardTrigger asChild>
                <div>Description: {post.description}</div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <h4 className="text-sm font-semibold">Description</h4>
                <p className="text-sm">{post.description}</p>
                <span className="text-xs">About Your LittleThing</span>
              </HoverCardContent>
            </HoverCard>
          </div>
        </li>
        <li className="py-3 sm:py-4">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            Frequency: {post.frequency}
          </p>
        </li>
        <li className="py-3 sm:py-4">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            Occurrence: {post.occurrence}
          </p>
        </li>
        <li className="py-3 sm:py-4">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            Started:{' '}
            {new Date(post.createdAt).toLocaleDateString('en-US', TimeOptions)}
          </p>
        </li>
        <li className="pt-3 pb-0 sm:pt-4">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            Completion Status:
            <span className="inline-flex items-center ml-2">
              {Array.from({ length: post.occurrence }).map((_, idx) => (
                <span
                  key={`${post.id}-${idx}`}
                  className={`w-2 h-2 rounded-full mr-2 ${
                    idx < post.completionCount ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                ></span>
              ))}
            </span>
          </p>
        </li>
      </ul>
    </div>
  );
};

export default LittleThingCard;
