import { SiteWrapper } from './common/SiteWrapper'
import { Card, Container, Page } from 'tabler-react'
import { Col, Row } from 'react-bootstrap'

export function WelcomePage () {
  return (
    <SiteWrapper>
      <Page.Content title="Welcome to Petclinic">
        <Container>
          <Row>
            <Col md={12}>
              <Card className="p-0 d-inline-block w-auto">
                <img className="img-responsive" src="/images/pets.png" alt="pets logo"/>
              </Card>
            </Col>
          </Row>
        </Container>
      </Page.Content>
    </SiteWrapper>
  )
}
