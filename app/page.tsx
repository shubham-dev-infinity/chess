'use client'
import { Provider } from 'react-redux'
import styles from './page.module.scss'
import ChessBoard from '@/components/chessboard'
import { store } from '@/store'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Provider store={store}>
          <ChessBoard />
        </Provider>
      </div>
    </main>
  )
}
