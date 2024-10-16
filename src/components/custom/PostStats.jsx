/* eslint-disable react/prop-types */
import { useLikePost } from "@/lib/react-query/queriesAndMutations";
import { ArrowBigDown, ArrowBigUp, MessageSquare } from "lucide-react";
import { useState } from "react";
import Comment from "../forms/Comment";

function PostStats({ post, userId }) {
  const likesList = post?.likes.map((user) => user.$id);
  const [upVotes, setUpVotes] = useState(likesList);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const { mutate: upVotePost } = useLikePost();

  const checkIsLiked = (likeList, userId) => {
    return likeList.includes(userId);
  };

  const handleUpVote = (e) => {
    e.stopPropagation();
    let newUpVotes = [...upVotes];
    if (newUpVotes.includes(userId)) {
      return newUpVotes;
    } else {
      newUpVotes.push(userId);
    }
    setUpVotes(newUpVotes);
    upVotePost({ postId: post?.$id, newUpVotes });
  };
  const handleDownVote = (e) => {
    e.stopPropagation();
    let newLikes = [...upVotes];
    if (newLikes.includes(userId)) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      return newLikes;
    }
  };

  return (
    <>
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1 bg-[#333d42] w-fit rounded-full  py-1 px-1">
        <ArrowBigUp
          onClick={handleUpVote}
          className={`${
            checkIsLiked(upVotes, userId) ? "text-green-500" : ""
          } cursor-pointer hover:text-green-500`}
        />
        <small>{upVotes.length}</small>
        <ArrowBigDown
          onClick={handleDownVote}
          className="cursor-pointer hover:text-btn"
        />
      </div>
      <div onClick={()=>setShowCommentBox((prev)=>!prev)} className="flex items-center gap-1 w-fit bg-[#333d42] py-1 px-3 rounded-full ">
        <MessageSquare size={18} className="cursor-pointer hover:text-btn" />
        <small>{post.comments.length}</small>
      </div>
    </div>
      {showCommentBox ? <Comment userId={userId} postId={post.$id} cancel={()=>setShowCommentBox(false)}/> : null}
    </>
  );
}

export default PostStats;
