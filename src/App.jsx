import { useState, useCallback,useEffect ,useRef} from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [Password, setpassword] = useState("")
  
  const passwordRef=useRef(null)

  const PasswordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*~"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setpassword(pass)

  }, [length, numberAllowed, charAllowed, setpassword])

  const copypass=useCallback(()=>{
   
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(Password)
  },[Password])

useEffect(()=>{
  PasswordGenerator()
},[length, numberAllowed, charAllowed, PasswordGenerator])

  return (
    <>


      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px my-8 px-5 py-6 text-orange-500 bg-gray-800 ">

        <h1 className='flex shadow rounded-lg justify-center pb-3 text-2xl text-white '>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={Password}
            className='outline-none w-full py-1 px-3 '
            placeholder='password'
            ref={passwordRef}
            readOnly
          />
          <button className='bg-orange-500 text-white px-3 py-0.5 outline-none 
          shrink-0 font-bold hover:bg-orange-600' onClick={copypass}>Copy</button>
        </div>

        <div className="flex text-sm gap-x-2">
        <div className="flex text-sm gap-x-2">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {
              setLength(e.target.value)
            }}
          />
          <label >Length:{length}</label>
        </div>

        <div className="flex text-sm gap-x-2">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id='numberInput'

            onChange={() => {
              setnumberAllowed((prev) => !prev)
            }}
          />
          <label htmlFor='numberInput'>Number</label>

        </div>
        <div className="flex text-sm gap-x-2">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id='spInput'

            onChange={() => {
              setcharAllowed((prev) => !prev)
            }}
          />
          <label htmlFor='spInput'>Spacial</label>

        </div>

        </div>
      </div>

    </>
  )
}

export default App
