import { SiteWrapper } from './common/SiteWrapper'
import styled from 'styled-components'
import { Error404Page } from 'tabler-react'

const Content = styled.div`
  margin-top: 96px;
`

export function NotFoundPage() {
  return (
    <SiteWrapper>
      <Content>
        <Error404Page />
      </Content>
    </SiteWrapper>
  )
}
