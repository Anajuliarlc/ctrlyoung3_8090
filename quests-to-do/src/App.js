import { useState } from "react";
import AddQuest from "./AddQuest";
import QuestList from "./QuestList";

function App() {
  const localQuests = JSON.parse(window.localStorage.getItem("quests")) || [];
  const [quests, setQuests] = useState(localQuests)

  function saveAddQuest(title){
    let auxQuests = quests;
    let id = 0;
    if (auxQuests.length){
      id = auxQuests[auxQuests.length-1].id;
    }
    id++

    const createdQuest = {
      id: id,
      title: title,
      status: "aberto",
      created_at: new Date(Date.now()).toUTCString(),    
    };
    auxQuests.push(createdQuest);
    localStorage.setItem("quests", JSON.stringify(auxQuests));
    getQuests();
  }

  function getQuests(){
    setQuests(JSON.parse(window.localStorage.getItem("quests")));
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="card w-[80%] lg:w-[50%] h-[70%] shadow-md rounded-sm 
      transform ease-out duration-300 items-center p-10 gap-5">
        <h1 className="text-5xl font-work font-bold w-fit text-center">
          Quests To Do
        </h1> 
        <AddQuest saveAddQuest={saveAddQuest} /> 
        <QuestList quests={quests}/> 
      </div>
    </div>
  );
}

export default App;