import { useGetSubreadits } from "@/lib/react-query/queriesAndMutations";
import Subreadit from "./components/Subreadit"

function Communities() {
  const { data: communities } = useGetSubreadits();
  return (
    <div className="overflow-auto">
        <h1 className="text-3xl font-semibold m-4">All Communities</h1>
        <div className=" mt-4 w-[80%]">
        {communities?.total > 0 && communities?.documents?.map((community)=>(
            <Subreadit key={community.$id} community={community}/>
        ))}
        </div>
    </div>
  )
}

export default Communities