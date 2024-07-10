import { useGetSubreadits } from "@/lib/react-query/queriesAndMutations";
import Subreadit from "./components/Subreadit"

function Communities() {
  const { data: communities } = useGetSubreadits();
  return (
    <div className=" overflow-scroll ">
        <h1>All Communities</h1>
        <div className=" mx-auto mt-4 w-[80%]">
        {communities?.total > 0 && communities?.documents?.map((community)=>(
            <Subreadit key={community.id} community={community}/>
        ))}
        </div>
    </div>
  )
}

export default Communities