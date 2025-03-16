import { useEffect, useState } from "react";
import { CreatorTask } from "../components/creatorTask";
import { useTask } from "../hooks/useTask";
import { TaskCard } from "../components/taskCard";
import { Star } from "lucide-react";
import { ColorPicker } from "../components/colorPicker";

function DashBoardView() {
  const { data, filteredData, isLoading, fetchData } = useTask();
  const [showFavorites, setShowFavorites] = useState(false);

  const favoriteFilter = () => {
    if (showFavorites) {
      fetchData();
    } else {
      fetchData("favorite=true");
    }
    setShowFavorites(!showFavorites);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="px-4 md:px-6 mt-6 mb-20">
      <div className="flex items-center justify-center flex-col gap-8">
        <CreatorTask />
        <div className="w-full flex  items-center justify-end">
          {" "}
          <div className="w-fit flex gap-2 px-2 py-1 items-center justify-end border border-[#D9D9D9] rounded-md bg-white">
            <p className="text-sm">Filtros</p>
            <Star
              width={18}
              height={18}
              fill={showFavorites ? "#FFA000" : "#C4C4C4"}
              onClick={favoriteFilter}
            />
            <ColorPicker />
          </div>
        </div>

        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <div className="flex flex-col w-full gap-6">
            {/* FAVORITOS CONTAINER */}
            <div className="px-4 mb-2">
              {data.length > 0 && (
                <p className="text-[#464646] text-xs">Favoritos</p>
              )}
            </div>

            <div className="relative w-full md:w-fit flex flex-wrap gap-10 md:gap-5 mb-2">
              {filteredData
                .filter((task) => task.favorite)
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    favorite={task.favorite}
                    color={task.color}
                  />
                ))}
            </div>

            {/* OUTROS CONTAINER */}
            <div className="px-4 mb-2">
              {data.length > 0 && !showFavorites && (
                <p className="text-[#464646] text-xs">Outros</p>
              )}
            </div>

            <div className="w-full md:w-fit flex flex-wrap gap-10 md:gap-5 mb-2">
              {filteredData
                .filter((task) => task.favorite == false)
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    favorite={task.favorite}
                    color={task.color}
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
