import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

const correctAnswer = "13";
const correctSets = ["L", "C"];

export function Question3() {
  const [answer, setAnswer] = useState("");
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [selectedSets, setSelectedSets] = useState<string[]>([]);
  const checkAnswer = () => {
    if (
      answer == correctAnswer &&
      selectedSets.every((a) => correctSets.includes(a)) &&
      selectedSets.length === correctSets.length
    ) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setShowResult(true);
  };
  function onClickCircle(setName: string) {
    setSelectedSets((prev) => {
      // if already contains, remove it
      if (prev.includes(setName)) return [...prev.filter((a) => a !== setName)];
      // else, add
      return [...prev, setName];
    });
  }
  return (
    <div className="flex items-end gap-2">
      <div className="relative mt-[30px] h-[510px] bg-white w-[850px] border border-gray-300">
        <div className="p-4 bg-blue-300 rounded-full absolute top-[40px] left-[180px] w-[500px] text-lg">
          I want to buy <strong>lollipops</strong> and <strong>candies</strong>{" "}
          all together but I need help figuring out how many sweets I'll have?
        </div>
        <img src="/B/girl.jpg" alt="" className="w-[240px]" />
        <div className="absolute top-[160px] left-[240px] w-[550px] h-[180px] bg-white border border-gray-300 p-2 grid grid-cols-4 items-center gap-1">
          <div
            data-selected={selectedSets.includes("L")}
            onClick={() => onClickCircle("L")}
            className="rounded-full w-[130px] aspect-square bg-[#FFBDA3] cursor-pointer data-[selected=true]:bg-lime-400"
          >
            L
          </div>
          <div
            data-selected={selectedSets.includes("G")}
            onClick={() => onClickCircle("G")}
            className="rounded-full w-[130px] aspect-square bg-[#FFC1CB] cursor-pointer data-[selected=true]:bg-lime-400"
          >
            G
          </div>
          <div
            data-selected={selectedSets.includes("C")}
            onClick={() => onClickCircle("C")}
            className="rounded-full w-[130px] aspect-square bg-[#B0C4DE] cursor-pointer data-[selected=true]:bg-lime-400"
          >
            C
          </div>
          <div
            data-selected={selectedSets.includes("T")}
            onClick={() => onClickCircle("T")}
            className="rounded-full w-[130px] aspect-square bg-[#87CEFA] cursor-pointer data-[selected=true]:bg-lime-400"
          >
            T
          </div>
        </div>
        <div className="absolute top-[355px] left-[300px] px-3">
          Answer:
          <div className="flex gap-2 w-[300px]">
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <Button onClick={checkAnswer}>Check your answer</Button>
          </div>
        </div>
        <div className="absolute top-[420px] left-[50px]">
          {showResult && (
            <div
              className={`my-4 flex justify-center items-center gap-2 ${
                isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {isCorrect ? (
                <div className="flex gap-4 items-center">
                  <CheckCircle2 className="w-6 h-6 flex-none" />
                  <div className="flex flex-col">
                    <p className="my-0">Yes, you are correct!</p>
                    <p>
                      The union set includes everything from both sets L and C,
                      which gives the answer L ∪ C = 13
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
    </div>
  );
}
