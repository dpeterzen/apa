import Tasks from "@/components/apa/Tasks";
import { ModeToggle } from "@/components/mode-toggle";
import { Switch } from "@/components/ui/switch";

export default function Home() {
  return (
      <div className="flex flex-col justify-between">
        <h1>Notemaven</h1>
        {/* <ModeToggle /> */}
        <Tasks />
      </div>

  );
}
