import { Link, useParams } from "react-router-dom"

function CommunityPosts() {
    const {communityName, communityId} = useParams()
  return (
    <div className="border rounded-lg mb-3 p-4">
        <div className="flex justify-between items-center">
            <h1>r/ {communityName}</h1>
    <Link to={`/communities/${communityName}/create-post/${communityId}`}>Create Post</Link>
        </div>
    </div>
  )
}

export default CommunityPosts