import { useState } from "react";
import AddQuest from "./AddQuest";

function App() {
  const [quests, setQuests] = useState([])

  function saveAddQuest(title){
    let auxQuests = quests;
    let id = 0;
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="card w-[80%] lg:w-[50%] h-[70%] shadow-md rounded-sm 
      transform ease-out duration-300 items-center p-10 gap-5">
        <h1 className="text-5xl font-work font-bold w-fit text-center">
          Quests To Do
        </h1> 
        <AddQuest saveAddQuest={saveAddQuest} />  
      </div>
    </div>
  );
}

export default App;
