import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

export function Question2() {
  const [answer, setAnswer] = useState("");
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const checkAnswer = () => {
    if (answer == "8") {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setShowResult(true);
  };
  return (
    <div>
      <div className="relative mt-[30px] bg-white w-[850px] border border-gray-300">
        <div className="p-4 bg-blue-300 rounded-full absolute top-[60px] left-[200px] w-[500px]">
          I want to buy <strong>chocolates</strong> and{" "}
          <strong>lollipops</strong> all together but I need help figuring out
          how many sweets I'll have?
        </div>
        <img src="/B/girl.jpg" alt="" className="w-[240px]" />
        <div className="absolute top-[160px] left-[230px] px-3">
          Answer:
          <div className="flex gap-2 w-[300px]">
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <Button onClick={checkAnswer}>Check your answer</Button>
          </div>
          <div>
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
                        The union set includes everything from both sets T and
                        L, which gives the answer T ∪ L = 8
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
    </div>
  );
}
