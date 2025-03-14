import { CreatorTask } from "./components/creatorTask";
import { NoteCard } from "./components/noteCard";

const taskData = [
  {
    title: "titulo",
    favorite: true,
    description: "Tarefa para ser entrega até o fim do dia",
  },
  {
    title: "titulo",
    favorite: true,
    description: "Tarefa para ser entrega até o fim do dia",
  },
  {
    title: "titulo",
    favorite: false,
    description: "Tarefa para ser entrega até o fim do dia",
  },
  {
    title: "titulo",
    favorite: false,
    description: "Tarefa para ser entrega até o fim do dia",
  },
  {
    title: "titulo",
    favorite: false,
    description: "Tarefa para ser entrega até o fim do dia",
  },
  {
    title: "titulo",
    favorite: false,
    description: "Tarefa para ser entrega até o fim do dia",
  },
];

function App() {
  return (
    <div className="px-6 mt-6">
      <div className="flex items-center justify-center flex-col gap-8">
        <CreatorTask />

        <div className="flex flex-col w-full">
          {/* FAVORITOS CONTAINER */}
          <div className="px-4 mb-2">
            <p className="text-[#464646] text-xs">Favoritos</p>
          </div>

          <div className="w-fit flex flex-wrap gap-6 justify-between">
            {taskData.map(
              (task, i) =>
                task.favorite && (
                  <NoteCard
                    key={i}
                    title={task.title}
                    description={task.description}
                    favorite={task.favorite}
                  />
                )
            )}
          </div>

          {/* OUTROS CONTAINER */}
          <div className="px-4 mb-2">
            <p className="text-[#464646] text-xs">Outros</p>
          </div>

          <div className="w-fit flex flex-wrap justify-between gap-4">
            {taskData.map(
              (task, i) =>
                !task.favorite && (
                  <NoteCard
                    key={i}
                    title={task.title}
                    description={task.description}
                    favorite={task.favorite}
                  />
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
