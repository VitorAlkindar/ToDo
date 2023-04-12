import { Trash } from "phosphor-react";

import styles from "./Task.module.css";
import { ChangeEvent } from "react";

interface TaskProps {
  id: string;
  text: string;
  isDone: boolean;
  onDeleteTask: (id: string) => void;
  onTaskChange: (id: string, event: boolean) => void;
  onTaskDoneCounter: () => void;
}

export function Task({
  id,
  text,
  isDone,
  onTaskChange,
  onTaskDoneCounter,
  onDeleteTask,
}: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(id);
  }

  function handleTaskChange(event: ChangeEvent<HTMLInputElement>) {
    onTaskChange(id, event.target.checked);
    onTaskDoneCounter();
  }

  return (
    <div className={styles.taskBox}>
      <div className={styles.textTask}>
        <input onChange={handleTaskChange} id={id} type="checkbox" />
        <label htmlFor={id} />
        <p className={isDone ? styles.textTaskDone : styles.textTaskNotDone}>
          {text}
        </p>
      </div>
      <button onClick={handleDeleteTask} title="Deletar comentário">
        <Trash size={20} />
      </button>
    </div>
  );
}
