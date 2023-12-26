import clipBoard from '@assets/clipboard.svg'
import plusCircle from '@assets/plus.svg'
import { Header, TaskStatus, Task } from '@components'
import { FormEvent, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import styles from './App.module.css'

interface Task {
  id: string
  description: string
  complete: boolean
}

export function App() {
  const [input, setInput] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])

  const hasTasks = tasks.length > 0
  const numberTasksCompleted = tasks.filter((item) => item.complete).length

  const deleteTask = (id: string) => {
    const newTasks = tasks.filter((item) => item.id !== id)
    setTasks(newTasks)
  }
  const toggleCompleteTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, complete: !task.complete } : task,
      ),
    )
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (input.trim().length === 0) {
      setInput('')
      return
    }
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: uuidv4(),
        complete: false,
        description: input,
      },
    ])
    setInput('')
  }

  return (
    <main className={styles.container}>
      <Header />
      <section className={styles.content}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <button className={styles.btn} type="submit">
            Criar
            <img src={plusCircle} alt="plus" />
          </button>
        </form>
        <div className={styles.tagsContainer}>
          <TaskStatus text="Tarefas criadas" value={`${tasks.length}`} />
          <TaskStatus
            text="Concluídas"
            value={
              numberTasksCompleted > 0
                ? `${numberTasksCompleted} de ${tasks.length}`
                : '0'
            }
          />
        </div>
        <div
          className={hasTasks ? styles.tasksContainer : styles.emptyContainer}
        >
          {!hasTasks ? (
            <>
              <img src={clipBoard} alt="clipBoard" />
              <p className={styles.emptyText}>
                Você ainda não tem tarefas cadastradas
              </p>
              Crie tarefas e organize seus itens a fazer{' '}
            </>
          ) : (
            tasks.map((item) => (
              <Task
                key={item.id}
                {...item}
                onToggleComplete={toggleCompleteTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>
      </section>
    </main>
  )
}
