import TopBar from "@/client/components/shared/TopBar"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <section style={{display: "flex", flexDirection: 'column'}}>
      <TopBar />
      <Outlet />
    </section>
  )
}

export default RootLayout