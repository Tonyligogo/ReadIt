import PostCard from "@/components/custom/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { Loader2 } from "lucide-react";
// import { Link } from "react-router-dom";

function HomePage() {
  const { data: posts, isPending } = useGetRecentPosts();

  return (
    <div className=" overflow-scroll ">
      {/* <Link to={'/explore'}>Explore</Link> */}
      <span className="block my-4 text-2xl font-bold">Explore readit</span>
      {isPending ?
      <div className="grid place-items-center">
        <Loader2 className="animate-spin"/>
      </div>
        :
        <ul className="flex flex-1 flex-col gap-5 w-full">
        {posts?.total > 0 && posts?.documents.map((post) => (
          <li key={post.$id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>}
    </div>
  );
}

export default HomePage;
