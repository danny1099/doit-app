import { Fragment } from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry'

export const ProvidersTree = ({ children }: Children) => {
  return (
    <Fragment>
      <AntdRegistry>{children}</AntdRegistry>
    </Fragment>
  )
}
