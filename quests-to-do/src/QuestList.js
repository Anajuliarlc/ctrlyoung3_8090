export default function QuestList(props){
    return(
        <div className="flex flex-col overflow-y-auto scrollbar-thin 
        gap-6 w-[80%]">
            {props.quests.map((quest) => {
                return <p key = {quest.id}>{quest.title}</p>;
            })}
        </div>
    )
}