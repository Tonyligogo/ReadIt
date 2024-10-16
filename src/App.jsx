import { Outlet, useLocation } from "react-router-dom"
import Header from "./components/custom/Header"
import RightSideBar from "./components/custom/RightSideBar"

function App() {
  const {pathname} = useLocation()
  console.log('app',pathname)

  return (
    <div className=" h-screen w-screen px-4 bg-primary">
      <Header/>
      <div className=" h-[calc(100%-70px)] grid grid-cols-1 gap-2 md:grid-cols-[auto_max-content]">
      <Outlet />
      {pathname == '/' && <RightSideBar/>}
      </div>
    </div>
  )
}

export default App
