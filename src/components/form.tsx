import { SyntheticEvent, useState } from 'react'
import styles from './form.module.css'

interface IData {
  name: string
  favoriteColor: string
  message: string
}

export function Form() {
  const [name, setName] = useState('')
  const [favoriteColor, setFavoriteColor] = useState('')
  const [data, setData] = useState<IData[]>([])

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()

    if (name === '' || favoriteColor === '') return

    const res = await fetch('/.netlify/functions/submit', {
      method: 'POST',
      body: JSON.stringify({ name, favoriteColor })
    })
    const json = await res.json()
    data.push(json)
    setData(data)
    setName('')
    setFavoriteColor('')
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className={styles.input}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label htmlFor="favoriteColor" className={styles.label}>
          Favorite Color
        </label>
        <input
          type="text"
          name="favoriteColor"
          id="favoriteColor"
          className={styles.input}
          onChange={(e) => setFavoriteColor(e.target.value)}
          value={favoriteColor}
        />
        <button className={styles.button}>Submit</button>
      </form>
      {data.map(({ message, name }) => (
        <p key={name}>{message}</p>
      ))}
    </>
  )
}
