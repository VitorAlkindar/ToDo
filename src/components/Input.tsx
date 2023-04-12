import { ChangeEvent } from "react";
import styles from "./Input.module.css";

interface InputProps {
  value: string;
  onNewTaskChange: (text: string) => void;
}

export function Input({ onNewTaskChange, value }: InputProps) {
  function handleTaskChange(event: ChangeEvent<HTMLInputElement>) {
    onNewTaskChange(event.target.value);
  }

  return (
    <input
      value={value}
      className={styles.inputText}
      type="text"
      placeholder="Adicione uma nova tarefa"
      onChange={handleTaskChange}
    />
  );
}
