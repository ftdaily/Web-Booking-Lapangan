// // ...existing code...
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// export default function Register() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')
//   const navigate = useNavigate()

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setError('')
//     if (!email || !password) {
//       setError('Email dan password harus diisi.')
//       return
//     }
//     // TODO: panggil API login di sini
//     console.log('login', { email, password })
//     // contoh redirect setelah login sukses
//     navigate('/')
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-amber-600 p-4">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
//         <h2 className="text-2xl font-semibold text-center mb-4">Masuk</h2>
//         {error && <div className="text-red-600 mb-3 text-sm">{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <label className="block mb-2 text-sm font-medium">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-3 py-2 border rounded mb-4 focus:outline-none focus:ring"
//             placeholder="you@example.com"
//           />

//           <label className="block mb-2 text-sm font-medium">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-3 py-2 border rounded mb-4 focus:outline-none focus:ring"
//             placeholder="Masukkan password"
//           />

//           <button
//             type="submit"
//             className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600 transition"
//           >
//             Login
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-600 mt-4">
//           Belum punya akun? <a href="/register" className="text-amber-600">Daftar</a>
//         </p>
//       </div>
//     </div>
//   )
// }
// // ...existing code...


// ...existing code...
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Email dan password harus diisi.')
      return
    }
    // TODO: panggil API login di sini
    console.log('login', { email, password })
    // contoh redirect setelah login sukses
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-600 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Masuk</h2>
        {error && <div className="text-red-600 mb-3 text-sm">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-4 focus:outline-none focus:ring"
            placeholder="you@example.com"
          />

          <label className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-4 focus:outline-none focus:ring"
            placeholder="Masukkan password"
          />

          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Belum punya akun? <a href="/register" className="text-amber-600">Daftar</a>
        </p>
      </div>
    </div>
  )
}
// ...existing code...




