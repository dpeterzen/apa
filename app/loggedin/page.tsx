import Tasks from "@/components/apa/Tasks";
import UserProfile from "@/components/apa/UserProfile";

export default function Home() {
  return (
      <main className="flex flex-col items-center justify-between p-24">
        <h1>apa</h1>
        <UserProfile />
        <Tasks />
      </main>

  );
}
