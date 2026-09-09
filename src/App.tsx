import { AppSidebar } from "@/components/app-sidebar"
import { Workspace } from "@/components/workspace"

export default function App() {
  return (
    <>
      <title>Passenger Rules Playground</title>
      <meta
        name="description"
        content="Build and test JsonLogic passenger rules for booking parties."
      />
      <AppSidebar />
      <Workspace />
    </>
  )
}
