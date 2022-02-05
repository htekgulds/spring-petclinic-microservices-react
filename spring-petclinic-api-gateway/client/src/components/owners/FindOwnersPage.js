import { SiteWrapper } from '../common/SiteWrapper'
import { Container, Form, Page } from 'tabler-react'
import { Button, Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export function FindOwnersPage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleChange = e => setQuery(e.target.value)

  const handleSubmit = e => {
    e.preventDefault()

    navigate(`/owners?lastName=${query}`)
  }

  return (
    <SiteWrapper>
      <Page.Content title="Find Owners">
        <Container>
          <Row>
            <Col md={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.InputGroup className="align-items-center">
                    <Form.Label className="mr-4">Last Name</Form.Label>
                    <Form.Input placeholder="Find Owners..." value={query} onChange={handleChange} />
                    <Form.InputGroupAppend>
                      <Button
                        color="primary"
                        type="submit"
                      >
                        Search
                      </Button>
                    </Form.InputGroupAppend>
                  </Form.InputGroup>
                </Form.Group>
              </Form>
              <div className="mt-6">
                <Button as={Link} to="/owners/new" color="primary">Add Owner</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Page.Content>
    </SiteWrapper>
  )
}
