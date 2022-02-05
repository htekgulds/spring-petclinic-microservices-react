import { SiteWrapper } from '../common/SiteWrapper'
import { Card, Container, Page, Table } from 'tabler-react'
import { Button, Col, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'

async function getOwner({ queryKey: [, id]}) {
  const res = await axios.get('/api/gateway/owners/' + id)
  return res.data
}

export function OwnerPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: owner, isLoading } = useQuery(['owner-detail', id], getOwner)

  if (!isLoading && !owner) {
    navigate('/owners/find')
  }

  return (
    <SiteWrapper>
      <Page.Content title="Owner Information">
        {isLoading && <div>Loading...</div>}
        {!isLoading && (
          <Container>
            <Row>
              <Col md={12}>
                <Card>
                  <Table striped>
                    <thead>
                    <tr>
                      <th>Name</th>
                      <th><strong>{owner.firstName} {owner.lastName}</strong></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td><strong>Address</strong></td>
                      <td>{owner.address}</td>
                    </tr>
                    <tr>
                      <td><strong>City</strong></td>
                      <td>{owner.city}</td>
                    </tr>
                    <tr>
                      <td><strong>Telephone</strong></td>
                      <td>{owner.telephone}</td>
                    </tr>
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="mb-4">
                <Button as={Link} to={'/owners/' + owner?.id + '/edit'} className="mr-4">Edit Owner</Button>
                <Button as={Link} to={'/owners/' + owner?.id + '/pets/new'} className="mr-4">Add New Pet</Button>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Card>
                  <Card.Header>
                    <Card.Title>Pets and Visits</Card.Title>
                  </Card.Header>
                  <Card.Body className="p-2">
                    <Table striped>
                      <tbody>
                      {owner?.pets.map(pet => (
                        <tr key={pet.id}>
                          <Row>
                            <Col>
                              <div className="p-4">
                                <div className="d-flex">
                                  <div className="w-9"><strong>Name</strong></div>
                                  <div>{pet.name}</div>
                                </div>
                                <div className="d-flex">
                                  <div className="w-9"><strong>Birth Date</strong></div>
                                  <div>{pet.birthDate}</div>
                                </div>
                                <div className="d-flex">
                                  <div className="w-9"><strong>Type</strong></div>
                                  <div>{pet.type.name}</div>
                                </div>
                              </div>
                            </Col>
                            <Col>
                              <Table striped>
                                <thead>
                                <tr>
                                  <th>Visit Date</th>
                                  <th>Description</th>
                                </tr>
                                </thead>
                                <tbody>
                                {pet.visits.map(visit => (
                                  <tr key={visit.id}>
                                    <td>{visit.date}</td>
                                    <td>{visit.description}</td>
                                  </tr>
                                ))}
                                <tr>
                                  <td><Button size="sm" as={Link} to={'/owners/' + owner.id + '/pets/' + pet.id + '/edit'}>Edit Pet</Button></td>
                                  <td><Button size="sm" as={Link} to={'/owners/' + owner.id + '/pets/' + pet.id + '/visits/new'}>Add Visit</Button></td>
                                </tr>
                                </tbody>
                              </Table>
                            </Col>
                          </Row>
                        </tr>
                      ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
      </Page.Content>
    </SiteWrapper>
  )
}
