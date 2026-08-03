import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <h1 className="text-3xl font-bold">Auth System</h1>
      </div>
    </>
  )
}

export default App
