
import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [upperAllowed, setUpperAllowed] = useState(false); 
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(""); 

  const passwordRef = useRef(null);


  const evaluateStrength = (pass) => {
    if (pass.length < 8) return "Weak";
    if (pass.length < 12) return "Moderate";
    return "Strong";
  };


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let charSet = "abcdefghijklmnopqrstuvwxyz"; 
    
    if (upperAllowed) charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
    if (numberAllowed) charSet += "0123456789"; 
    if (charAllowed) charSet += "!@#$%^&*~"; 

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * charSet.length);
      pass += charSet.charAt(char);
    }

    setPassword(pass); 
    setStrength(evaluateStrength(pass)); 
  }, [length, numberAllowed, charAllowed, upperAllowed]);

 
  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

 
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, upperAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-5 py-6 bg-gray-800 text-orange-500">
      <h1 className="text-2xl text-white font-bold text-center mb-4">Password Generator</h1>

     
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={password}
          readOnly
          ref={passwordRef}
          className="w-full py-2 px-4 border border-gray-300 rounded-md text-black outline-none"
        />
        <button
          onClick={copyPassword}
          className="ml-3 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
        >
          Copy
        </button>
      </div>

    
      <div className="mb-4">
        <p className="text-white text-sm">Strength: {strength}</p>
      </div>

      
      <div className="flex items-center mb-4">
        <label className="text-white text-sm mr-2">Length: {length}</label>
        <input
          type="range"
          min="8"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="w-full h-2 bg-gray-500 rounded-lg cursor-pointer"
        />
      </div>

      
      <div className="flex gap-x-4 mb-4">
        <div className="flex items-center text-white text-sm">
          <input
            type="checkbox"
            id="numberInput"
            checked={numberAllowed}
            onChange={() => setNumberAllowed(prev => !prev)}
            className="mr-2"
          />
          <label htmlFor="numberInput">Include Numbers</label>
        </div>

        <div className="flex items-center text-white text-sm">
          <input
            type="checkbox"
            id="specialCharInput"
            checked={charAllowed}
            onChange={() => setCharAllowed(prev => !prev)}
            className="mr-2"
          />
          <label htmlFor="specialCharInput">Include Special Characters</label>
        </div>

        <div className="flex items-center text-white text-sm">
          <input
            type="checkbox"
            id="upperInput"
            checked={upperAllowed}
            onChange={() => setUpperAllowed(prev => !prev)}
            className="mr-2"
          />
          <label htmlFor="upperInput">Include Uppercase Letters</label>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={passwordGenerator}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Generate Password
        </button>
      </div>

      
      <div className="flex justify-center mt-4">
        <button
          onClick={() => {
            setLength(8);
            setNumberAllowed(false);
            setCharAllowed(false);
            setUpperAllowed(false);
          }}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
