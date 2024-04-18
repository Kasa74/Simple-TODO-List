import { useState } from "react";
import "./index.css";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<TodoItem[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask !== "") {
      const newItem = {
        id: Math.floor(Math.random() * (10000 - 1 + 1)) + 1,
        text: newTask,
        completed: false,
      };
      setTasks([...tasks, newItem]);
      setNewTask("");
    } else {
      alert("Поле для задачи не может быть пустым!");
    }
  };

  const removeTask = (id: number) => {
    const modified = tasks.filter((task) => task.id !== id);
    setTasks(modified);
  };

  const confirmTask = (id: number) => {
    const modified = [...tasks];
    for (let i = 0; i < modified.length; i++) {
      if (modified[i].id === id) {
        modified[i].completed = !modified[i].completed;
      }
    }
    // modified.forEach((task) =>
    //   task.id === id ? (task.confirmed = true) : task.confirmed
    // );
    setTasks(modified);
  };
  return (
    <div className="container mx-auto max-w-3xl pt-5 pl-20 pr-20">
      <form className="w-full ">
        <div className="flex items-center py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            value={newTask}
            placeholder="Введите задачу"
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
            onClick={() => addTask()}
          >
            ADD TO TODO LIST
          </button>
        </div>
      </form>
      <div className="font-bold py-2 px-4 flex flex-col items-center mb-2">
        TO DOs:
      </div>
      <div className="flex flex-col items-center">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={
              task.completed
                ? "flex flex-row w-full mb-5 border-2 px-2 py-2 border-green-300"
                : "flex flex-row w-full mb-5 border-2 px-2 py-2"
            }
          >
            <div className="grow">{task.text}</div>
            <div
              className="mr-2 text-green-500 cursor-pointer"
              onClick={() => confirmTask(task.id)}
            >
              ✓
            </div>
            <div
              key={task.id}
              className="grow-0 text-red-600 cursor-pointer"
              onClick={() => removeTask(task.id)}
            >
              X
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
