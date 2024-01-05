import TopBar from "@/client/components/shared/TopBar"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <section >
      <TopBar />
      <Outlet />
    </section>
  )
}

export default RootLayout