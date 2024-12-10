import { Button } from "@/components/ui/button";
import { shuffle } from "@/utils/shuffle";
import { AlertCircle, CheckCircle2, CircleIcon, SquareIcon, TriangleIcon } from "lucide-react";
import { useMemo, useState } from "react";

type DraggableItem = {
  id: string;
  value: string;
  image?: string;
  target: string;
};

const data: DraggableItem[] = [
  { id: "1", value: "Item 1", image: "/BOOK/1.png", target: "land" },
  { id: "2", value: "Item 2", image: "/BOOK/2.png", target: "land" },
  { id: "3", value: "Item 3", image: "/BOOK/3.png", target: "land" },
  { id: "4", value: "Item 4", image: "/BOOK/4.png", target: "land" },
  { id: "5", value: "Item 5", image: "/BOOK/5.png", target: "land" },
  { id: "6", value: "Item 6", image: "/BOOK/6.png", target: "land" },
  { id: "7", value: "Item 7", image: "/BOOK/7.png", target: "air" },
  { id: "8", value: "Item 8", image: "/BOOK/8.png", target: "air" },
  { id: "9", value: "Item 9", image: "/BOOK/9.png", target: "air" },
  { id: "10", value: "Item 10", image: "/BOOK/10.png", target: "air" },
  { id: "11", value: "Item 11", image: "/BOOK/11.png", target: "air" },
  { id: "12", value: "Item 12", image: "/BOOK/12.png", target: "air" },
  { id: "13", value: "Item 13", image: "/BOOK/13.png", target: "water" },
  { id: "14", value: "Item 14", image: "/BOOK/14.png", target: "water" },
  { id: "15", value: "Item 15", image: "/BOOK/15.png", target: "water" },
  { id: "16", value: "Item 16", image: "/BOOK/16.png", target: "water" },
  { id: "17", value: "Item 17", image: "/BOOK/17.png", target: "water" },
  { id: "18", value: "Item 18", image: "/BOOK/18.png", target: "water" },
];

export function Level1_1({ onNextLevel }: { onNextLevel?: () => void }) {
  const items = useMemo(() => shuffle(data), []);

  const [droppedItems, setDroppedItems] = useState<
    { id: string; target: string }[]
  >([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const onDrop = (
    e: React.DragEvent<SVGElement | HTMLDivElement>,
    target: string
  ) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");

    if (id) {
      setDroppedItems((prev) =>
        prev.find((item) => item.id === id)
          ? prev.map((item) => (item.id === id ? { id, target } : item))
          : [...prev, { id, target }]
      );
    }
  };

  const onDragOver = (e: React.DragEvent<SVGElement | HTMLDivElement>) => {
    e.preventDefault();
  };

  const onRemoveDroppedItem = (id: string) => {
    setDroppedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const checkAnswer = () => {
    const allCorrect = droppedItems.every((droppedItem) => {
      const item = items.find((i) => i.id === droppedItem.id);
      return droppedItem.target === item.target;
    });
    const allItemsPlaced = items.every((item) =>
      droppedItems.map((a) => a.id).includes(item.id)
    );

    setIsCorrect(allCorrect && allItemsPlaced);
    setShowResult(true);
  };

  return (
    <div>
      <div className="prose mb-3">
        <h2>1. Welcome to Exploration Adventures!</h2>
        <h3>1.1. Transport Challenge: Land, Sea, or Sky?</h3>
        <p>
          Look at the fun picture below. There are different types of
          transportation like cars, boats, airplanes, and more. Your task is to
          drag and match each vehicle into the correct shape.
        </p>
        <h4>Classify the transportation:</h4>
        <p className="m-0"><SquareIcon className="inline-flex" /> represent land transport</p>
        <p className="m-0"><TriangleIcon className="inline-flex" /> represent water transport</p>
        <p className="m-0"><CircleIcon className="inline-flex" /> represent air transport</p>
      </div>

      {/* Draggable Items */}
      <div className="flex gap-2 mb-2 flex-wrap">
        {items.map((item) => {
          const isDropped = droppedItems.some((dropped) => dropped.id === item.id);

          return (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => onDragStart(e, item.id)}
              className="rounded shadow-md bg-white cursor-grab"
              style={{ opacity: isDropped ? 0.5 : 1 }}
            >
              <img
                src={item.image}
                alt={item.value}
                className="w-24 h-24 object-contain"
              />
            </div>
          )
        })}
      </div>

      <div className="w-[1450px] relative">
        {/* render droppedItems for land */}
        <div
          className="absolute w-[340px] h-[340px] top-[80px] left-[80px] flex flex-wrap flex-col justify-center items-start gap-2"
          onDrop={(e) => onDrop(e, "land")}
          onDragOver={onDragOver}
        >
          {droppedItems
            .filter((a) => a.target === "land")
            .map(({ id }) => {
              const item = items.find((item) => item.id === id);
              return (
                <div key={id} className="rounded shadow-md bg-white">
                  <img
                    src={item.image}
                    alt={item.value}
                    className="w-24 h-24 object-contain cursor-pointer"
                    onClick={() => onRemoveDroppedItem(item.id)}
                  />
                </div>
              );
            })}
        </div>

        {/* render droppedItems for water */}
        <div
          className="absolute w-[210px] h-[200px] top-[230px] left-[620px] flex flex-wrap flex-col justify-center items-start gap-2"
          onDrop={(e) => onDrop(e, "water")}
          onDragOver={onDragOver}
        >
          {droppedItems
            .filter((a) => a.target === "water")
            .map(({ id }) => {
              const item = items.find((item) => item.id === id);
              return (
                <div key={id} className="rounded shadow-md bg-white">
                  <img
                    src={item.image}
                    alt={item.value}
                    className="w-[66px] h-[66px] object-contain cursor-pointer"
                    onClick={() => onRemoveDroppedItem(item.id)}
                  />
                </div>
              );
            })}
        </div>

        {/* render droppedItems for air */}
        <div
          className="absolute w-[280px] h-[280px] top-[110px] right-[160px] flex flex-wrap flex-col justify-center items-start gap-2"
          onDrop={(e) => onDrop(e, "air")}
          onDragOver={onDragOver}
        >
          {droppedItems
            .filter((a) => a.target === "air")
            .map(({ id }) => {
              const item = items.find((item) => item.id === id);
              return (
                <div key={id} className="rounded shadow-md bg-white">
                  <img
                    src={item.image}
                    alt={item.value}
                    className="w-24 h-24 object-contain cursor-pointer"
                    onClick={() => onRemoveDroppedItem(item.id)}
                  />
                </div>
              );
            })}
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1450"
          height="480"
          style={{
            backgroundColor: "white",
            border: "1px solid #ccc",
          }}
        >
          {/* Square */}
          <rect
            width="400"
            height="400"
            x="50"
            y="50"
            fill="peachpuff"
            onDrop={(e) => onDrop(e, "land")}
            onDragOver={onDragOver}
          />
          {/* Triangle */}
          <polygon
            points="275,10 50,400 500,400"
            fill="aqua"
            transform="translate(450, 50)"
            onDrop={(e) => onDrop(e, "water")}
            onDragOver={onDragOver}
          />
          {/* Circle */}
          <circle
            r="200"
            fill="pink"
            transform="translate(1150, 250)"
            onDrop={(e) => onDrop(e, "air")}
            onDragOver={onDragOver}
          />
        </svg>
      </div>
      <div className="flex justify-center items-center gap-2 mt-3">
        <Button onClick={checkAnswer}>Check your answer</Button>
        <Button onClick={onNextLevel} disabled={!isCorrect}>Next level</Button>
      </div>
      <div className="h-32">
        {showResult && (
          <div
            className={`my-4 flex justify-center items-center gap-2 ${
              isCorrect ? "text-green-600" : "text-red-600"
            }`}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-6 h-6" />
                <span>Yes, you are correct!</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-6 h-6" />
                <span>Opps, try again.</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
