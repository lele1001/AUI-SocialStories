import TopBar from "@/components/shared/TopBar"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <div className="w-full h-fit">
      <TopBar />
      <Outlet />
    </div>
  )
}

export default RootLayout