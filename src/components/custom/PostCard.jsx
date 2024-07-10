/* eslint-disable react/prop-types */

import { useUserContext } from "@/context/AuthContext"
import { multiFormatDateString } from "@/lib/utils"
import { Pencil } from "lucide-react"
import { Link } from "react-router-dom"
import PostStats from "./PostStats"

function PostCard({post}) {
    const {user}= useUserContext()
  return (
    <div className="post-card">
    <div className="flex justify-between">
      <div className="flex items-center gap-3">
        <Link to={`/profile/${post.user.$id}`}>
          <img
            src={
              post.user?.imageUrl 
            }
            alt="creator"
            className="size-6 rounded-full"
          />
        </Link>

        <div className="flex gap-4 items-center">
            <p>r/{post.subreadit.name}</p>
            <p className="text-sm text-[#333d42]">Posted {multiFormatDateString(post.$createdAt)}</p>
        </div>
      </div>

      <Link
        to={`/update-post/${post.$id}`}
        className={`${user.id !== post.user.$id && "hidden"}`}>
        <Pencil size={14} />
      </Link>
    </div>

    <Link to={`/post/${post.$id}`}>
      <div className="text-md py-5">
        <p>{post.title}</p>
      </div>

      <img
        src={post.imageUrl}
        alt="post image"
        className="post-card_img"
      />
    </Link>

    <PostStats post={post} userId={user.id} />
  </div>
  )
}

export default PostCard