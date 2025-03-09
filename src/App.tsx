import { useState, useEffect } from "react";
import Input from "./components/Input";
import moonIcon from "../src/assets/moon-svgrepo-com.svg";
import sunIcon from "../src/assets/sun-fog-svgrepo-com.svg";
import Counter from "./components/Counte";
import TaskList from "./components/TaskList";
import Modal from "./components/Modal";
import axios from "axios";

function App() {
  const [taskList, setTaskList] = useState<
    { task: string; timestamp: string }[]
  >([]);
  const [task, setTask] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [editValue, setEditValue] = useState({ value: "", idx: 0 });
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleRemoveItem = (index: number) => {
    const filterData = taskList.filter((_, idx) => idx !== index);
    setTaskList(filterData);
    localStorage.setItem("tasklist", JSON.stringify(filterData));
  };

  const handleAddTask = () => {
    if (task.trim() !== "") {
      const newTask = {
        task: task,
        timestamp: new Date().toLocaleString(),
      };
      const newTaskList = [...taskList, newTask];
      setTaskList(newTaskList);
      setTask("");
      localStorage.setItem("tasklist", JSON.stringify(newTaskList));
    }
  };

  const handleSave = (value: string, idx: number) => {
    const updatedTaskList = taskList.map((item, index) =>
      index === idx ? { ...item, task: value } : item
    );
    setTaskList(updatedTaskList);
    localStorage.setItem("tasklist", JSON.stringify(updatedTaskList));
    setIsOpenModal(false);
  };

  const getTask = async () => {
    try {
      const resolve = await axios.get(
        "https://mocki.io/v1/85d9f7b7-4c06-4ef1-b0c6-7f6c7dee9a85"
      );
      const data = resolve.data;

      setTaskList(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTask();

    const mode = localStorage.getItem("mode");
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("mode", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("mode", "light");
    }
  }, [darkMode]);

  return (
    <div className="relative w-full justify-center items-center">
      <div className="w-full h-screen flex justify-center items-center bg-gray-300">
        <div className="shadow-2xl w-11/12 h-5/6 flex flex-col relative items-center bg-blue-100 dark:bg-gray-800 rounded-3xl overflow-hidden md:w-1/2 lg:w-1/3">
          <div className="w-full flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600">
            <h1 className="text-white text-2xl font-bold">Daily Schedule</h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-400 dark:bg-yellow-200 hover:bg-yellow-100 transition-colors duration-200"
            >
              <img
                src={darkMode ? sunIcon : moonIcon}
                alt="toggle dark mode"
                className="w-6 h-6"
              />
            </button>
          </div>
          <div className="w-full gap-2 mt-6 flex justify-center items-center px-6">
            <button
              className="text-white pb-1 text-2xl w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 flex justify-center items-center shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={handleAddTask}
            >
              +
            </button>
            <Input task={task} setTask={setTask} />
            <Counter />
          </div>
          <TaskList
            taskList={taskList}
            handleRemoveItem={handleRemoveItem}
            setIsOpenModal={setIsOpenModal}
            setEditValue={setEditValue}
          />
          <footer className="w-full py-4 text-black  dark:bg-gray-800 dark:text-white text-center">
            <p>have a good day</p>
          </footer>
        </div>

        <Modal
          isOpen={isOpenModal}
          cancle={() => setIsOpenModal(false)}
          editValue={editValue}
          save={handleSave}
        />
      </div>
    </div>
  );
}

export default App;
