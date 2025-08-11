
import Link from "next/link"

export default function Home() {
  return (
    <main style={{minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <div>
        <h1>Utility Site</h1>

        <Link href="/imgtopdf">imgtopdf</Link>
        </div>
    </main>
  )
}