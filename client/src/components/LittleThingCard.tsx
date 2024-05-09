import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import clsx from 'clsx';
import * as littlethingsApi from '@/api-client/littlethingsApi';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { Frequency, TimeOptions } from '@/types/LittleThingTypes';
import { Post } from '@/types/LittleThingTypes';
import { useToast } from '@/components/ui/use-toast';

interface CardComponentProps {
  key: string;
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[]>>;
  postId: string;
  littlething: string;
  description: string;
  frequency: Frequency;
  occurrence: number;
  completionCount: number;
  createdAt: string;
  deletable: boolean;
  // user_id?: string;
  // updatedAt?: string;
}

const LittleThingCard = ({
  setPosts,
  littlething,
  description,
  frequency,
  occurrence,
  createdAt,
  postId,
  deletable,
  completionCount,
  posts,
}: CardComponentProps) => {
  const remainingOccurences = useMemo(() => {
    return occurrence - completionCount;
  }, [occurrence, completionCount]);
  //still debating if we allow more completions that occurences or not...because we dont want them to spam the database with that many clicks, but what if they wanna do more completions...idk
  // const completionCountHandler = async (postId: string) => {
  //   const success = await littlethingsApi.patchCompletionCount(postId);
  //   if (success) {
  //     setPosts((prevPosts) => {
  //       return prevPosts.map((post) => {
  //         if (post.id === postId) {
  //           return {
  //             ...post,
  //             completionCount: (post.completionCount ?? 0) + 1,
  //           };
  //         }
  //         return post;
  //       });
  //     });
  //   }
  // };
  const { toast } = useToast();

  //I think right now we are not doing a direct database check like littlethings.occurrences === littlethings.completionCount in like the actual query
  //maybe its better to do the actual comparison in the patch request and check there, send teh error message from there to the toast...
  //could probably do the comparison and if the completioncount is === the occurrences we wont let the request go through and just send the toast error message from backend...
  //but idk how we want to deal with more completions than occurrences, if we want users to have it or not
  //but i also like the idea of when the daily or weekly resets we move the completion count to a finalCount, then reset the completionCount to 0 (good idea for that problem of resets)
  //like daily 24 hours pass, update db with set finalCount += completionCount, set completionCount to 0...
  //i tried doing the server message display on the toast like your delete, but im having trouble navigating the error message from backend to the frontend...cant find how to access it.
  //but for now client side works
  const completionCountHandler = async (postId: string) => {
    const currentPost = posts.find((post: Post) => post.id === postId);

    if (currentPost && currentPost.completionCount < currentPost.occurrence) {
      try {
        const success = await littlethingsApi.patchCompletionCount(postId);
        if (success) {
          setPosts((prevPosts) =>
            prevPosts.map((post) => {
              if (post.id === postId) {
                return {
                  ...post,
                  completionCount: post.completionCount + 1,
                };
              }
              return post;
            })
          );
        }
      } catch (error) {
        console.error('Failed to update the completion count:', error);
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Maximum completions reached for this item.',
      });
    }
  };

  const deletePostHandler = async (postId: string) => {
    const success = await littlethingsApi.deletePost(postId);
    if (success) {
      setPosts((posts) => posts.filter((post) => post.id !== postId));
    }
  };

  return (
    <div>
      <div
        key={postId}
        className={clsx(
          'max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 h-90 w-96 relative',
          { 'wiggle-animation': deletable }
        )}
      >
        {deletable && (
          <button
            onClick={() => deletePostHandler(postId)}
            className="w-5 h-5 absolute top-2 left-[-15px] transform -translate-y-1/2 translate-x-1/2 p-1 bg-[#CE6A6C] rounded-full shadow-lg flex items-center justify-center"
            aria-label="Delete post"
          >
            <span className="text-white">-</span>
          </button>
        )}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="flex-shrink-0"></div>
            <div className="flex-1 min-w-0 ms-4">
              <div className="flex-shrink-0"></div>
              <p className="text-xl font-medium text-gray-900 truncate dark:text-white">
                <span className="text-lt-green-2">Little</span> Thing:{' '}
                {littlething}
                <span className="inline-flex items-center justify-between">
                  <button
                    onClick={() => completionCountHandler(postId)}
                    className="button-splash absolute top-2.5 right-3 inline-flex items-center justify-between px-2 py-2 overflow-hidden font-medium transition-all bg-gray-200 rounded-full hover:bg-white group"
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
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            <li className="py-3 sm:py-4">
              <div className="flex items-center">
                <div className="flex-shrink-0"></div>
                <div className="flex-1 min-w-0 ms-4">
                  <div className="flex-shrink-0"></div>
                  <div className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <div className="truncate">
                          Description: {description}
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="flex justify-between space-x-4">
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">
                              Description
                            </h4>
                            <p className="text-sm">{description}</p>
                            <div className="flex items-center pt-2">
                              <span className="text-xs text-muted-foreground">
                                About Your LittleThing{' '}
                              </span>
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center ">
                <div className="flex-shrink-0"></div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Frequency: {frequency}
                  </p>
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center">
                <div className="flex-shrink-0"></div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Occurrence: {occurrence}
                  </p>
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center ">
                <div className="flex-shrink-0"></div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Started:{' '}
                    {new Date(createdAt).toLocaleDateString(
                      'en-US',
                      TimeOptions
                    )}
                  </p>
                </div>
              </div>
            </li>
            <li className="pt-3 pb-0 sm:pt-4">
              <div className="flex items-center ">
                <div className="flex-shrink-0"></div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Completion Status:
                    <span className="inline-flex items-center ml-2">
                      {Array.from({ length: completionCount }).map((_, idx) => (
                        <span
                          key={idx}
                          className="w-2 h-2 rounded-full bg-green-500 mr-2"
                        ></span>
                      ))}
                    </span>
                    <span className="inline-flex items-center mr-2">
                      {Array.from({
                        length: remainingOccurences,
                      }).map((_, idx) => (
                        <span
                          key={idx}
                          className="w-2 h-2 rounded-full bg-gray-500 mr-2"
                        ></span>
                      ))}
                    </span>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LittleThingCard;
