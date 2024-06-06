import { useEffect } from 'react'
import { useState } from 'react'

export const useField = (name, defaultValue) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const onChange = event => {
    setValue(event.target.value)
  }

  return {
    field: { onChange, name, value, id: name },
    clear: initialValue => setValue(initialValue ?? '')
  }
}
