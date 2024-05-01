enum Frequency {
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly',
  Yearly = 'Yearly',
}

interface Post {
  id: string;
  user_id: string;
  description: string;
  littlething: string;
  frequency: Frequency;
  occurrence: number;
  createdAt: string;
  updatedAt: string;
  completionCount: number | undefined;
}

const createPost = async (data: Post) => {
  try {
    const { description, littlething, occurrence, frequency } = data;
    console.log('Form Data: ', data);

    console.log(data);

    const response = await fetch('/api/v1/littlethings/create-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description,
        littlething,
        frequency,
        occurrence,
      }),
    });

    const createdPost = await response.json();
    return createdPost;
  } catch (error) {
    console.error('Failed to create new post', error);
  }
};

const deletePost = async (postId: string) => {
  try {
    const response = await fetch(`/api/v1/littlethings/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete selected post');
    }
    return true;
  } catch (error) {
    console.error('Error deleting post', error);
  }
};

const getAllPosts = async () => {
  try {
    const response = await fetch('/api/v1/littlethings/get-all-posts', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const postData = await response.json();
    if (response.ok) {
      return postData.message;
    }
  } catch (error) {
    console.error('Error fetching post data', error);
  }
};

const patchCompletionCount = async (postId: string) => {
  try {
    const response = await fetch(
      `/api/v1/littlethings/patch-completion-count/${postId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      throw new Error('Failed to update completion count');
    }
    return true;
  } catch (error) {
    console.error('Error updating completion count', error);
  }
};

export { createPost, getAllPosts, deletePost, patchCompletionCount };
