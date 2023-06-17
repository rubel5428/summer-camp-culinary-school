import { Outlet } from "react-router-dom";
import Header from "../component/Dashboard/Header";
import Sidebar from "../component/Dashboard/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex gap-x-8 pr-8">
      <div className="w-1/5">
      <Sidebar />
      </div>
       <div className="w-4/5">
       <Header  />
       <Outlet />
       </div>
    </div>
  )
}
