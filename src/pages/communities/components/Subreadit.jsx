/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"

function Subreadit({community}) {
 
  return (
    <Link key={community.$id} to={`/communities/${community.name}/${community.$id}`} >
        <div className="rounded-lg mb-3 p-4 bg-black">
          <h1>r/ {community.name}</h1>
          <p className="mt-2 text-sm">{community.description}</p>
        </div>
    </Link>
  )
}

export default Subreadit