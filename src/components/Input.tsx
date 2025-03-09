import { Dispatch, SetStateAction } from "react";

const Input = ({
  task,
  setTask,
}:{
  task : string;
  setTask: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="flex gap-2">
      <input
      value={task}
        onChange={(e) => setTask(e.target.value)}
        className="bg-white pl-2 w-[]  h-10  rounded-2xl  shadow-2xl text-black outline-none"
        type="text"
      />
    </div>
  );
};
export default Input;
