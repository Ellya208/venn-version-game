// import Geogebra from "react-geogebra";

import { Button } from "@/components/ui/button";
import { Diagram } from "./diagram";
import { Trophy } from "lucide-react";

/*
1. {false, false, true, false} = A ∩ B
2. {false, true, true, true} = A ∪ B
3. {true, false, false, false} = A' ∩ B'
4. {false, false, false, true} = A' ∩ B
5. {false, true, false, false} = A ∩ B'
6. {true, false, true, true} = A' ∪ B
7. {true, true, true, false} = A ∪ B'
8. {true, true, false, true} = A' ∪ B'
*/

export function Level2_0({ onNextLevel }: { onNextLevel?: () => void }) {
  return (
    <div>
      <div className="prose mb-3">
        <h3>2. Let's put your skills to the test!</h3>
        <p>Here are some notes for you to revise before exercise time.</p>
        <img src="/operations.jpg" alt="" />
        <p className="m-0">Time to gear up! Ready, set, solve!</p>
        <p className="m-0">Instruction: Click on the correct region.</p>
      </div>
      <Diagram level={1} expected="{false, false, true, false}" title="A ∩ B" />
      <Diagram level={2} expected="{false, true, true, true}" title="A ∪ B" />
      <Diagram
        level={3}
        expected="{true, false, false, false}"
        title="A' ∩ B'"
      />
      <Diagram
        level={4}
        expected="{false, false, false, true}"
        title="A' ∩ B"
      />
      <Diagram
        level={5}
        expected="{false, true, false, false}"
        title="A ∩ B'"
      />
      <Diagram level={6} expected="{true, false, true, true}" title="A' ∪ B" />
      <Diagram level={7} expected="{true, true, true, false}" title="A ∪ B'" />
      <Diagram level={8} expected="{true, true, false, true}" title="A' ∪ B'" />

      <div className="mt-24 flex flex-col justify-center items-center">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Congratulations!</h1>
        <p className="text-xl text-gray-600">You've completed all levels!</p>
      </div>

      <div className="flex justify-center items-center gap-2 mt-3 h-32">
        <Button onClick={onNextLevel}>Start over</Button>
      </div>
    </div>
  );
}
