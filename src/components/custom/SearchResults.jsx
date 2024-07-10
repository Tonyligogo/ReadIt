/* eslint-disable react/prop-types */
import { Loader2 } from "lucide-react"
import GridPostList from "./GridPostList"

function SearchResults({isSearchFetching, searchedPosts}) {
    console.log(searchedPosts,'search results')
    if (isSearchFetching) return <Loader2 className="animate-spin"/>
    if (searchedPosts && searchedPosts.documents.length > 0){
        return (
            <GridPostList posts={searchedPosts?.documents}/>
        )
    }
    

  return (
    <p className="text-light-4 mt-10 text-center w-full">No results found</p>
  )
}

export default SearchResults