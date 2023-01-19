import { useState, useEffect, useContext } from 'react';

// import UserContext from '../user/context'
import {
  GetCommentsRequest,
  CreateCommentRequest,
  DeleteCommentRequest,
} from './requests';


export function nestComments(comments) {
  let threads = {};

  for (const comment of comments) {
    if (comment.parent) {
      threads[comment.parent] = threads[comment.parent] ?? [];
      threads[comment.parent].push(comment);
    }
  }

  for (let i = comments.length - 1; i >= 0; i--) {
    const comment = comments[i];
    if (threads[comment._id]) {
      comments[i].children = threads[comment._id];
      delete threads[comment._id];
    }
  }

  return comments.filter((comment) => !comment.parent);
}

export function useComments(projectId) {
  const [result, setResult] = useState(null);

  const refetch = async () => {
    if (projectId) {
      const result = await GetCommentsRequest({ projectId });
      if (result.success) {
        result.data = nestComments(result.data);
      }
      setResult(result);
    } else {
      setResult(null);
    }
  };

  useEffect(() => {
    refetch();
  }, [projectId]);

  return { result, comments: result?.data, refetch };
}

export function useCreateComment(projectId, userId) {
  // const { us } = useGetUserById(userId)

  const createComment = async (body, parent) => {
    return await CreateCommentRequest({
      projectId,
      owner: userId,
      body,
      parent,
    });
  };

  return { createComment };
}

export function useDeleteComment() {
  const [result, setResult] = useState(null);

  const deleteComment = async (commentId) => {
    setResult(await DeleteCommentRequest({ commentId }));
  };

  return { deleteComment, result };
}
