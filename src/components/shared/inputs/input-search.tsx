import { Input } from 'antd'

interface Props {
  placeholder: string
  size: string
  icon?: React.ReactNode
}

export const InputSearch = ({ placeholder, icon, size = '250px' }: Props) => {
  return (
    <Input
      placeholder={placeholder}
      suffix={icon}
      style={{ width: size }}
      variant="filled"
    />
  )
}
