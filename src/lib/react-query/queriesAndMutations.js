import { createPost, createSubreadit, createUserAccount, deletePost, getInfinitePosts, getPostById, getRecentPosts, getSubreadits, getUserPosts, likePost, searchPosts, signInAccount, signOutAccount, updatePost } from '@/appwrite/api'
import{
  useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
    // useQuery,
    // useQueryClient,
    // useInfiniteQuery,
}from '@tanstack/react-query'
import { QUERY_KEYS } from './queryKeys'

export const useCreateUserAccountMutation = ()=>{
    return useMutation({
        mutationFn:(user)=> createUserAccount(user)
    })
}
export const useSignInAccount = ()=>{
    return useMutation({
        mutationFn:(user)=> signInAccount(user)
    })
}
export const useSignOutAccount = ()=>{
    return useMutation({
        mutationFn:signOutAccount
    })
}
export const useCreateSubreadit = ()=>{
    return useMutation({
        mutationFn:(data)=> createSubreadit(data)
    })
}
export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post) => createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
      },
    });
  };
  export const useGetRecentPosts = () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      queryFn: getRecentPosts,
    });
  };
  export const useGetSubreadits = () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_SUBREADITS],
      queryFn: getSubreadits,
    });
  };
  export const useLikePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (postId, likesArray) => likePost(postId, likesArray),
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POSTS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        });
      },
    });
  };
  export const useGetPostById = (postId) => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
      queryFn: () => getPostById(postId),
      enabled: !!postId,
    });
  };

  export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post) => updatePost(post),
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
        });
      },
    });
  };
  
  export const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ postId, imageId }) =>
        deletePost(postId, imageId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
      },
    });
  };

  export const useGetUserPosts = (userId) => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_USER_POSTS, userId],
      queryFn: () => getUserPosts(userId),
      enabled: !!userId,
    });
  };
  export const useGetPosts =()=>{
    return useInfiniteQuery({
      queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
      queryFn: getInfinitePosts,
      getNextPageParam: (lastPage) => {
        if (lastPage && lastPage.documents.length === 0) return null;
        const lastId = lastPage?.documents[lastPage?.documents.length - 1].$id;
        return lastId;
      },
    })
  }
  export const useSearchPost = (searchTerm)=>{
    return useQuery({
      queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
      queryFn: ()=> searchPosts(searchTerm),
      enabled:!!searchTerm,
    })
  }