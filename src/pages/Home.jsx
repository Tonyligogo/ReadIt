import LeftSideBar from "@/components/custom/LeftSideBar";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "./HomePage";

function Home() {
  const {pathname} = useLocation();
  return (
    <div className="h-full overflow-hidden grid grid-cols-1 md:grid-cols-[max-content_auto] gap-3 ">
      <div className="hidden md:block border-r pl-2 pr-8 border-gray-500 ">
        <LeftSideBar />
      </div>
      <div className="overflow-auto pb-2">
        {pathname == '/' ? <HomePage/> : <Outlet/>}
      </div>
    </div>
  );
}

export default Home;
