import { SiteWrapper } from './common/SiteWrapper'
import styled from 'styled-components'
import { Error500Page } from 'tabler-react'

const Content = styled.div`
  margin-top: 96px;
`

export function ErrorPage() {
  return (
    <SiteWrapper>
      <Content>
        <Error500Page />
      </Content>
    </SiteWrapper>
  )
}
