import LeftSideBar from "@/components/custom/LeftSideBar";
import RightSideBar from "@/components/custom/RightSideBar";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-[max-content_minmax(auto,_600px)_auto] gap-3 ">
      <div className="hidden md:block border-r pl-2 pr-8 border-gray-500 ">
        <LeftSideBar />
      </div>
      <Outlet/>
      <div className="hidden md:block bg-secondary">
        <RightSideBar />
      </div>
    </div>
  );
}

export default Home;
