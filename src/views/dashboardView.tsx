import { CreatorTask } from "../components/creatorTask";
import { NoteCard } from "../components/noteCard";
import { useTask } from "../hooks/useTask";

// const taskData = [
//   {
//     title: "titulo",
//     favorite: true,
//     description: "Tarefa para ser entrega até o fim do dia",
//   },
//   {
//     title: "titulo",
//     favorite: true,
//     description: "Tarefa para ser entrega até o fim do dia",
//   },
//   {
//     title: "titulo",
//     favorite: false,
//     description: "Tarefa para ser entrega até o fim do dia",
//   },
//   {
//     title: "titulo",
//     favorite: false,
//     description: "Tarefa para ser entrega até o fim do dia",
//   },
//   {
//     title: "titulo",
//     favorite: false,
//     description: "Tarefa para ser entrega até o fim do dia",
//   },
//   {
//     title: "titulo",
//     favorite: false,
//     description: "Tarefa para ser entrega até o fim do dia",
//   },
// ];

function DashBoardView() {
  const { data, isLoading } = useTask();
  console.log("data", data);

  return (
    <div className="px-6 mt-6">
      <div className="flex items-center justify-center flex-col gap-8">
        <CreatorTask />

        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <div className="flex flex-col w-full">
            {/* FAVORITOS CONTAINER */}
            <div className="px-4 mb-2">
              <p className="text-[#464646] text-xs">Favoritos</p>
            </div>

            <div className="w-fit flex flex-wrap gap-5 mb-2">
              {data
                .filter((task) => task.favorite)
                .map((task) => (
                  <NoteCard
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    favorite={task.favorite}
                  />
                ))}
            </div>

            {/* OUTROS CONTAINER */}
            <div className="px-4 mb-2">
              <p className="text-[#464646] text-xs">Outros</p>
            </div>

            <div className="w-fit flex flex-wrap gap-5 mb-2">
              {data
                .filter((task) => task.favorite == false)
                .map((task) => (
                  <NoteCard
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    favorite={task.favorite}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashBoardView;
