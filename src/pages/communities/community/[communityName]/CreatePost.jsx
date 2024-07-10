import CreatePostForm from "@/components/forms/CreatePostForm";
import { ImagePlus } from "lucide-react";
import { useParams } from "react-router-dom";

function CreatePost() {
  const params = useParams();
  return (
      <div className="common-container">
        <div className="max-w-5xl flex items-center gap-3 justify-start w-full">
          <ImagePlus />
          <h2 className=" font-bold text-left w-full ">Create Post</h2>
        </div>
        <CreatePostForm params={params}/>
      </div>
  );
}

export default CreatePost;
