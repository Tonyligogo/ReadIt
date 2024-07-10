import CreatePostForm from "@/components/forms/CreatePostForm";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { ImagePlus, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

function EditPost() {
  const {postId} = useParams();
  const {data:post, isPending}= useGetPostById(postId || '');
  if (isPending) return <Loader2 className="animate-spin" />;
  return (
      <div className="common-container">
        <div className="max-w-5xl flex items-center gap-3 justify-start w-full">
          <ImagePlus />
          <h2 className=" font-bold text-left w-full ">Edit Post</h2>
        </div>
        <CreatePostForm post={post} action='update'/>
      </div>
  );
}

export default EditPost;
