import CommunitySidebar from "@/components/custom/CommunitySidebar";
import PostCard from "@/components/custom/PostCard";
import { useGetSingleSubreadit } from "@/lib/react-query/queriesAndMutations";
import { Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";

function CommunityPosts() {
  const { communityName, communityId } = useParams();
  const subId = communityId;
  const { data: sub, isPending } = useGetSingleSubreadit(subId);

  return (
    <div className="lg mb-3 p-4">
          <div className="flex justify-between items-center bg-[#2a3236] mb-3 p-4 rounded-md ">
            <h1 className="font-bold text-3xl">r/ {communityName}</h1>
            <Link
              to={`/communities/${communityName}/create-post/${communityId}`}
              className="border h-[45px] rounded-full px-3 py-2 border-b-4 transition hover:border-b"
            >
              + Create Post
            </Link>
          </div>
      <div className="grid grid-cols-1 md:grid-cols-[auto_max-content] gap-4">
        <div>
          {isPending ? (
            <div className="grid place-items-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <ul className="flex flex-1 flex-col gap-9 w-full">
              {sub?.posts.length > 0 &&
                sub?.posts.map((post) => (
                  <li key={post.$id}>
                    <PostCard post={post} />
                  </li>
                ))}
            </ul>
          )}
        </div>
        <CommunitySidebar subInfo={sub}/>
      </div>
    </div>
  );
}

export default CommunityPosts;
