import { getAllChores } from "../../../services/chores";
import Board from "./components/Board";
import LogoutButton from "./components/LogoutButton";

export default async function DashboardPage() {
  const chores = await getAllChores();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-6">
      <div className="w-full max-w-7xl px-4 relative">
        <LogoutButton />
        <h1 className="text-2xl font-semibold text-center text-gray-600 mb-8">
          Do-it!
        </h1>

        {/* Board */}
        {<Board initialChores={chores} />}
      </div>
    </div>
  );
}
