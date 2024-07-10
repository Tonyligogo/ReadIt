import { Outlet } from "react-router-dom"
import Header from "./components/custom/Header"

function App() {

  return (
    <div className=" h-screen w-screen px-4 bg-primary">
      <Header/>
      <div className=" h-[calc(100%-70px)] ">
      <Outlet/>
      </div>
    </div>
  )
}

export default App
