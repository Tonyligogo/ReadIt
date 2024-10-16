import { useGetSubreadits } from "@/lib/react-query/queriesAndMutations";
import { Link } from "react-router-dom";

function RightSideBar() {
    const { data: communities } = useGetSubreadits();
  return (
    <div className="h-fit bg-dark-1 px-5 py-3 rounded-md pr-36 mt-4">
        <span className="text-xs font-semibold text-text-custom-neutral">POPULAR COMMUNITIES</span>
        <ul className="pl-2 mb-4">
        {communities?.total > 0 && communities?.documents?.map((community)=>(
            <li key={community.id} className="text-text-custom-neutral mt-4 flex flex-col">
                <Link to={`/communities/${community.name}/${community.$id}`}>r/{community.name}</Link>
                <span className="text-xs">12,365 members</span>
            </li>
            
        ))}
        </ul>
        <Link to='/communities' className="text-sm">See more</Link>
    </div>
  )
}

export default RightSideBar