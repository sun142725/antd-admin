import { useEffect } from 'react'

function useDebounce(fn: any, delay: number, dep: any = []) {
  useEffect(() => {
    let timer: any
    timer = setTimeout(fn, delay)
    return () => clearTimeout(timer)
  }, [...dep])
}
export default useDebounce
