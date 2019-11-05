/*
 * @Descripttion: 
 * @Author: lishuangli
 * @Date: 2019-11-05 20:35:24
 * @LastEditors: lishuangli
 * @LastEditTime: 2019-11-05 21:20:20
 */
import React, { useState, useRef, useEffect } from 'react';


function App() {
  const [value, setValue] = useState('aaa')
  return (
    <div>
      <InputNumber value={value} onChange={e => { }} />
      <InputNumber defaultValue={value} onChange={e => { }} />
    </div>
  )
}

function InputNumber(props) {
  const inputEl = useRef(null);
  const [inputValue, setInputValue] = useState(props.value || '')

  function handleChange(e) {
    const v = e.target.value;
    setInputValue(v);
    props.onChange(e)
  }

  useEffect(() => {
    inputEl.current.value = props.defaultValue || props.value || '';
  }, [])

  return (
    <input
      onChange={handleChange}
      value={inputValue}
      ref={inputEl}
    />
  )
}

export default App;