import GridPostList from "@/components/custom/GridPostList";
import SearchResults from "@/components/custom/SearchResults";
import useDebounce from "@/hooks/useDebounce";
import { useGetPosts, useSearchPost } from "@/lib/react-query/queriesAndMutations";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

function Explore() {
    const [searchValue, setSearchValue] = useState('');
    const {ref, inView} = useInView();
    const {data: posts, fetchNextPage, hasNextPage} = useGetPosts();  
    const debouncedValue = useDebounce(searchValue, 500);
    const {data:searchPosts, isFetching:isSearchFetching} =useSearchPost(debouncedValue)
    useEffect(()=>{
        if(inView && !searchValue){
            fetchNextPage();
        }
    }, [inView, searchValue])
    if(!posts){
        return <Loader2 className="animate-spin"/>
    }
  const shouldShowSearchResults = searchValue !== ''
  const shouldShowPosts = !shouldShowSearchResults && posts.pages.every((item)=>item.documents.length === 0);
  return (
    <div>
        <input type="text" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} placeholder="Search for posts..."/>
        <div>
        {shouldShowSearchResults ?
        (
            <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchPosts}
            />
        ) :
        shouldShowPosts ? 
        <h2>End of posts.</h2>
        :
        posts.pages.map((item, index) => (
        <GridPostList key={`page-${index}`} posts={item.documents} />
        ))}
        </div>
        {hasNextPage && !searchValue &&(
            <div ref={ref} className="mt-10">
                <Loader2 className="animate-spin"/>
            </div>
        )}

    </div>
  )
}

export default Explore