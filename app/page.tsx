'use client'
import styles from './page.module.scss'
import ChessBoard from '@/components/chessboard'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <ChessBoard />
      </div>
    </main>
  )
}
