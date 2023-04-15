import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./App.module.css";
import { PlusCircle } from "phosphor-react";
import { v4 as uuidv4 } from "uuid";

import "./global.css";

import ClipBoard from "./assets/clipBoard.svg";

import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { Task } from "./components/Task";

function App() {
  const [newTaskText, setNewTaskText] = useState("");

  const [tasks, setTasks] = useState([
    {
      id: "1",
      text: "Estudar Node.js",
      isDone: false,
    },
  ]);

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newTask = {
      id: uuidv4(),
      text: newTaskText,
      isDone: false,
    };

    setTasks([...tasks, newTask]);

    setNewTaskText("");
  }

  function newTaskChange(newText: string) {
    setNewTaskText(newText);
  }

  function deleteTask(id: string) {
    const taskWithoutDeletedOne = tasks.filter((task) => {
      return task.id != id;
    });

    setTasks(taskWithoutDeletedOne);
  }

  function taskChange(id: string, event: boolean) {
    const taskCompleted = tasks.map((task) =>
      task.id == id
        ? {
            ...task,
            isDone: event,
          }
        : task
    );

    setTasks(taskCompleted);
  }

  const newValueTaskDoneCount = tasks.reduce((taskDoneCount, currentTask) => {
    if (currentTask.isDone) {
      return taskDoneCount + 1;
    }
    return taskDoneCount;
  }, 0);

  const isNewTaskEmpty = newTaskText.length === 0;
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <form
          onSubmit={handleCreateNewTask}
          action=""
          className={styles.ToDoForm}
        >
          <Input onNewTaskChange={newTaskChange} value={newTaskText} />
          <button type="submit" disabled={isNewTaskEmpty}>
            Criar <PlusCircle size={20} />
          </button>
        </form>
        <div className={styles.tasksArea}>
          <div className={styles.informationTaskCount}>
            <div className={styles.createdTaskCount}>
              <span>Tarefas criadas</span>
              <div>
                <p>{tasks.length}</p>
              </div>
            </div>
            <div className={styles.completedTasksCount}>
              <span>Concluídas</span>
              {newValueTaskDoneCount > 0 ? (
                <div>
                  <p>
                    {newValueTaskDoneCount} de {tasks.length}
                  </p>
                </div>
              ) : (
                <div>
                  <p>0</p>
                </div>
              )}
            </div>
          </div>
          <main className={styles.tasks}>
            {tasks.length == 0 && (
              <div className={styles.createdTasksEmpty}>
                <img src={ClipBoard} alt="" />
                <p>
                  <strong>Você ainda não tem tarefas cadastradas</strong>
                </p>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            )}
            <div className={styles.taskList}>
              {tasks.map((task) => {
                return (
                  <Task
                    key={task.id}
                    id={task.id}
                    text={task.text}
                    isDone={task.isDone}
                    onDeleteTask={deleteTask}
                    onTaskChange={taskChange}
                  />
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
