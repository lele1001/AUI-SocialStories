import { Button } from "@/components/ui/button"

const Story = () => {
  return (
    <div className="flex flex-row h-full">
      <div className="storyContainer">
        <div className="storyText"></div>
        <div className="flex flex-row gap-6">
          <Button className="button_primary">Previous</Button>
          <Button className="button_primary">Next</Button>
        </div>
      </div>
      <img className="w-3/4 h-full"/>
    </div>
  )
}

export default Story