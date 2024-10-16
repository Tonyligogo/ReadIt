import { useUserContext } from "@/context/AuthContext";
import { House } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const topics = [
  {
    id: 1,
    name: "Internet culture",
    url: "/internet-culture",
  },
  {
    id: 2,
    name: "Gaming",
    url: "/gaming",
  },
  {
    id: 3,
    name: "Tech",
    url: "/tech",
  },
  {
    id: 4,
    name: "Pop culture",
    url: "/pop-culture",
  },
  {
    id: 5,
    name: "Movies & TV",
    url: "/movies-and-tv",
  },
  {
    id: 6,
    name: "Communities",
    url: "/communities",
  },
  {
    id: 7,
    name: "+ Create Community",
    url: "/r/create-community",
  },
];

function LeftSideBar() {
  const { pathname } = useLocation();
  const { user } = useUserContext();

  let filteredTopics = [...topics]
  if(!user.username){
    filteredTopics.pop()
  }
  
  return (
    <aside>
      <NavLink
        to="/"
        className={`flex gap-2 items-center mt-4 p-2 pr-4 rounded-md ${
          pathname === "/home" ? "bg-btn" : "hover:bg-secondary"
        }`}
      >
        <House /> Home
      </NavLink>
      <div className="border-t border-gray-500 mt-4 pb-4">
        <h2 className="my-4">Topics</h2>
        <ul className="flex flex-col gap-4">
          {filteredTopics.map((topic) => (
            <li
              key={topic.id}
              className={`p-2 pr-4  rounded-md ${
                pathname === topic.url ? "bg-btn" : "hover:bg-secondary"
              }`}
            >
              <NavLink to={`${topic.url}`}>{topic.name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default LeftSideBar;
