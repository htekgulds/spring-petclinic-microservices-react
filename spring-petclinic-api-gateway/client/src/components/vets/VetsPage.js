import { SiteWrapper } from '../common/SiteWrapper'
import { Card, Container, Page, Table } from 'tabler-react'
import { Col, Row } from 'react-bootstrap'
import axios from 'axios'
import { useQuery } from 'react-query'

async function getVets() {
  const res = await axios.get('/api/vet/vets')
  return res.data
}

const renderRow = (vet) => (
  <tr key={vet.id}>
    <td>{vet.firstName} {vet.lastName}</td>
    <td>{vet.specialties.length === 0 ? <span className="font-italic">none</span> : vet.specialties.map(i => i.name).join(', ')}</td>
  </tr>
)

export function VetsPage() {
  const { data: vets = [] } = useQuery('vets', getVets)

  return (
    <SiteWrapper>
      <Page.Content title="Veterinarians">
        <Container>
          <Row>
            <Col md={12}>
              <Card>
                <Table striped>
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Specialties</th>
                  </tr>
                  </thead>
                  <tbody>
                  {vets.map(renderRow)}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </Page.Content>
    </SiteWrapper>
  )
}
