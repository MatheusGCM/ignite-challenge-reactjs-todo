import checkCircle from '@assets/check-circle.svg'
import { Trash, Circle } from '@phosphor-icons/react'

import styles from './task.module.css'

interface TaskProps {
  id: string
  description: string
  complete: boolean
  onDelete(id: string): void
  onToggleComplete(id: string): void
}

export function Task({
  id,
  complete = false,
  description,
  onDelete,
  onToggleComplete,
}: TaskProps) {
  return (
    <div className={styles.taskContainer}>
      <div onClick={() => onToggleComplete(id)}>
        {complete ? (
          <img src={checkCircle} alt="checkCircle" />
        ) : (
          <Circle size={22} color="var(--blue)" className={styles.circle} />
        )}
      </div>

      <p className={complete ? styles.taskTextComplete : styles.taskText}>
        {description}
      </p>
      <div className={styles.trashBtn} onClick={() => onDelete(id)}>
        <Trash size={17} />
      </div>
    </div>
  )
}
