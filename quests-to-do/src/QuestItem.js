import { useState } from "react";

export default function QuestIten(props){
    const [title, setTitle] = useState(props.quest.title);
    //recebe e define o título da missão
    const [checked, setChecked] = useState(false);
    //recebe e define se a missão foi concluída
    const [editMode, setEditMode] = useState(false);
    //chama o estado de edição da missão no componente
    const concluded = props.quest.status === "concluído";
    //define o visual da missão na lista

    return (
    <div className="flex gap-4 flex-col md:flex-row items-center">
      <div className="flex gap-4 items-center w-full sm:w-[80%]">
        <input
          disabled={concluded}
          type="checkbox"
          checked={checked}
          className="checkbox rounded-full border"
          onChange={() => {
            if (concluded) return;
            else {
              setChecked(!checked);
              props.saveConcludedQuest(props.quest);
            }
          }}
        />
      </div>

    </div>
    );
}