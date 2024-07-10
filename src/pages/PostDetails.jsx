import GridPostList from "@/components/custom/GridPostList";
import PostStats from "@/components/custom/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useDeletePost, useGetPostById, useGetUserPosts } from "@/lib/react-query/queriesAndMutations";
import { multiFormatDateString } from "@/lib/utils";
import { ArrowLeft, Loader2, Pencil, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";


const PostDetails = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { user } = useUserContext();

  const { data: post, isLoading } = useGetPostById(postId);
  const { data: userPosts, isLoading: isUserPostLoading } = useGetUserPosts(
    post?.user.$id
  );
  const { mutate: deletePost } = useDeletePost();

  const relatedPosts = userPosts?.documents.filter(
    (userPost) => userPost.$id !== postId
  );

  const handleDeletePost = () => {
    deletePost({ postId, imageId: post?.imageId });
    navigate(-1);
  };

  return (
    <div className="post_details-container">
      <div className="hidden md:flex max-w-5xl w-full">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="">
          <ArrowLeft />
        </Button>
      </div>

      {isLoading || !post ? (
        <Loader2 className="animate-spin" />
      ) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="creator"
            className="post_details-img"
          />

          <div className="post_details-info">
            <div className="flex justify-between w-full">
              <Link
                to={`/profile/${post?.user.$id}`}
                className="flex items-center gap-3">
                <img
                  src={
                    post?.user.imageUrl 
                  }
                  alt="creator"
                  className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                />
                <div className="flex gap-1 flex-col">
                  <p className="">
                    {post?.user.name}
                  </p>
                    <p className="">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                </div>
              </Link>

              <div className="flex items-center gap-4">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.user.$id && "hidden"}`}>
                  <Pencil />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`post_details-delete_btn ${
                    user.id !== post?.user.$id && "hidden"
                  }`}><Trash2 />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full ">
              <p>{post?.title}</p>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl">
        <hr className="border w-full border-dark-4/80" />

        <h3 className="w-full my-10">
          More Related Posts
        </h3>
        {isUserPostLoading || !relatedPosts ? (
          <Loader2 className="animate-spin" />
        ) : (
          <GridPostList posts={relatedPosts} />
        )}
      </div>
    </div>
  );
};

export default PostDetails;