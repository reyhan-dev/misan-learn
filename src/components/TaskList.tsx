import trash from "../assets/trash-can-svgrepo-com.svg";
import edit from "../assets/edit-pencil-01-svgrepo-com.svg";
import { CounterContext } from "./CounterProvider";

import { Dispatch, SetStateAction, useContext } from "react";

interface Task {
  task: string;
  timestamp: string;
}

interface TaskListProps {
  taskList: Task[];
  handleRemoveItem: (index: number) => void;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  setEditValue: Dispatch<SetStateAction<{ value: string; idx: number }>>;
}
const TaskList = ({
  taskList,
  handleRemoveItem,
  setIsOpenModal,
  setEditValue,
}: TaskListProps) => {
   const counterContext = useContext(CounterContext);
  return (
    <div className="mt-6 w-full flex flex-col justify-start items-center gap-3 px-6 overflow-y-auto ">
      <p>{counterContext?.count}</p>
      {taskList.map((item, idx) => (
        <div
          key={idx}
          className="flex w-full py-3 px-4 bg-white dark:bg-gray-700 justify-between items-center rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <div className="w-full">
            <div className="flex flex-col items-start">
              <h1 className="text-black dark:text-white font-medium">
                {item.task}
              </h1>

              <div className="flex w-full justify-between mt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.timestamp}
                </p>

                <div className="flex gap-2">
                  <img
                    onClick={() => handleRemoveItem(idx)}
                    className="w-8 h-8 bg-gray-200 p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                    src={trash}
                    alt="Delete"
                  />

                  <img
                    onClick={() => {
                      setIsOpenModal(true);
                      setEditValue({ value: item.task, idx });
                    }}
                    className="w-8 h-8 bg-gray-200 p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                    src={edit}
                    alt="Edit"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TaskList;
