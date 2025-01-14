import { Button } from "@/components/ui/button";
import { shuffle } from "@/utils/shuffle";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useMemo, useState } from "react";

type DraggableItem = {
  id: string;
  value: string;
  image?: string;
  target: string;
};

const data: DraggableItem[] = [
  { id: "1", value: "Item 1", image: "/BOOK/19.png", target: "C" },
  { id: "2", value: "Item 2", image: "/BOOK/20.png", target: "C" },
  { id: "3", value: "Item 3", image: "/BOOK/21.png", target: "C" },
  { id: "4", value: "Item 4", image: "/BOOK/22.png", target: "C" },
  { id: "5", value: "Item 5", image: "/BOOK/23.png", target: "C" },
  { id: "6", value: "Item 6", image: "/BOOK/24.png", target: "C" },
  { id: "7", value: "Item 7", image: "/BOOK/25.png", target: "C" },
  { id: "8", value: "Item 8", image: "/BOOK/26.png", target: "O" },
  { id: "9", value: "Item 9", image: "/BOOK/27.png", target: "O" },
  { id: "10", value: "Item 10", image: "/BOOK/28.png", target: "O" },
  { id: "11", value: "Item 11", image: "/BOOK/29.png", target: "O" },
  { id: "12", value: "Item 12", image: "/BOOK/30.png", target: "O" },
  { id: "13", value: "Item 13", image: "/BOOK/31.png", target: "O" },
  { id: "14", value: "Item 14", image: "/BOOK/32.png", target: "O" },
];

export function Level1_2({ onNextLevel }: { onNextLevel?: () => void }) {
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
      if (id.startsWith('http')) return
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
    // check if all placed item is correct
    const allCorrect = droppedItems.every((droppedItem) => {
      const item = items.find((i) => i.id === droppedItem.id);
      return droppedItem.target === item.target;
    });

    // check if every item is placed
    const allItemsPlaced = items.every((item) =>
      droppedItems.map((a) => a.id).includes(item.id)
    );

    setIsCorrect(allCorrect && allItemsPlaced);
    setShowResult(true);
  };

  return (
    <div>
      <div className="prose mb-3 text-xl">
        <h3>1.2. Classify the Eaters: Carnivores vs Omnivores!</h3>
        <p>
          Let's learn about animals and their eating habits! You'll see pictures
          of different animals below. Your task is to drag and place the animals
          into the correct parts of the Venn diagram.
        </p>
        <p className="m-0">C: Animal that eats meat</p>
        <p className="m-0">O: Animal that eats both plants and meat</p>
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

      <div className="w-[800px] relative">
        {/* render droppedItems for O */}
        <div
          className="absolute w-[160px] h-[380px] top-[220px] left-[140px] flex flex-wrap gap-2 flex-col justify-center items-start"
          onDrop={(e) => onDrop(e, "O")}
          onDragOver={onDragOver}
        >
          {droppedItems
            .filter((a) => a.target === "O")
            .map(({ id }) => {
              const item = items.find((item) => item.id === id);
              return (
                <div key={id} className="rounded shadow-md bg-white">
                  <img
                    src={item.image}
                    alt={item.value}
                    className="w-16 h-16 object-contain cursor-pointer"
                    onClick={() => onRemoveDroppedItem(item.id)}
                  />
                </div>
              );
            })}
        </div>

        {/* render droppedItems for C */}
        <div
          className="absolute w-[280px] h-[260px] top-[330px] right-[160px] flex flex-wrap gap-2 flex-col justify-center items-start"
          onDrop={(e) => onDrop(e, "C")}
          onDragOver={onDragOver}
        >
          {droppedItems
            .filter((a) => a.target === "C")
            .map(({ id }) => {
              const item = items.find((item) => item.id === id);
              return (
                <div key={id} className="rounded shadow-md bg-white">
                  <img
                    src={item.image}
                    alt={item.value}
                    className="w-16 h-16 object-contain cursor-pointer"
                    onClick={() => onRemoveDroppedItem(item.id)}
                  />
                </div>
              );
            })}
        </div>
        <h1 className="absolute left-[5px] text-2xl">ξ</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="800"
          viewBox="-3 -2 5 5"
          style={{
            backgroundColor: "white",
            border: "1px solid #ccc",
          }}
        >
          {/* Circle O */}
          <g
            fillOpacity="1"
            onDrop={(e) => onDrop(e, "O")}
            onDragOver={onDragOver}
          >
            <circle cx="-.5" cy=".577" r="2" fill="pink" />
          </g>

          {/* Circle C */}
          <g
            fillOpacity="1"
            onDrop={(e) => onDrop(e, "C")}
            onDragOver={onDragOver}
          >
            <circle cx="0.1" cy=".877" r="1.2" fill="darkturquoise" />
          </g>
          <text x="-.9" fontSize={0.15}>
            C
          </text>
          <text x="-1.9" y="-1" fontSize={0.15}>
            O
          </text>
        </svg>
      </div>
      <div className="flex justify-center items-center gap-2 mt-3">
        <Button onClick={checkAnswer}>Check your answer</Button>
        <Button onClick={onNextLevel} disabled={!isCorrect}>
          Next level
        </Button>
      </div>
      <div className="h-32">
        {showResult && (
          <div
            className={`my-4 flex justify-center items-center gap-2 ${
              isCorrect ? "text-green-600" : "text-red-600"
            }`}
          >
            {isCorrect ? (
              <div className="flex gap-4 items-center">
                <CheckCircle2 className="w-6 h-6" />
                <div className="flex flex-col">
                  <span>Yes, you are correct!</span>
                  <p>
                    Set C is a subset of Set O, C ⊂ O. This means that all carnivores
                    (Set C) are part of omnivores (Set O) because omnivores can
                    eat both plants and meat, while carnivores only eat meat.
                  </p>
                  <p>
                    You did an excellent job organizing the animals into the
                    right groups! Keep it up!
                  </p>
                </div>
              </div>
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
