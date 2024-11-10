import { cx, type CXOptions } from 'cva'

export function cn(...inputs: CXOptions) {
  return (cx(inputs))
}
