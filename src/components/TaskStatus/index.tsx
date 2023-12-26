import styles from './taskStatus.module.css'

interface TaskStatusProps {
  text: string
  value: string
}

export function TaskStatus({ text, value }: TaskStatusProps) {
  return (
    <div
      className={styles.container}
      style={{ color: text === 'Concluídas' ? 'var(--purple)' : 'var(--blue)' }}
    >
      {text}
      <div className={styles.tag}>{value}</div>
    </div>
  )
}
