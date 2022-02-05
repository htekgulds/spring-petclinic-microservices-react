import { useQuery } from 'react-query'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'
import { SiteWrapper } from '../common/SiteWrapper'
import { Card, Container, Page, Table } from 'tabler-react'
import { Col, Row } from 'react-bootstrap'

async function getOwners() {
  const res = await axios.get('/api/customer/owners')
  return res.data
}

const renderRow = (owner) => (
  <tr key={owner.id}>
    <td>
      <a href={`/owners/${owner.id}`}>
        {owner.firstName} {owner.lastName}
      </a>
    </td>
    <td className='hidden-sm hidden-xs'>{owner.address}</td>
    <td>{owner.city}</td>
    <td>{owner.telephone}</td>
    <td className='hidden-xs'>{owner.pets.map(pet => pet.name).join(', ')}</td>
  </tr>
);

export function ListOwnersPage() {
  const [searchParams] = useSearchParams()
  const { data: owners = [] } = useQuery('owners', getOwners)
  const filteredOwners = useMemo(() => searchParams.get('lastName') ?
    owners.filter(i => i.lastName.toLowerCase().includes(searchParams.get('lastName').toLowerCase()))
    : owners
  , [owners, searchParams])

  return (
    <SiteWrapper>
      <Page.Content title="Owners List">
        <Container>
          <Row>
            <Col md={12}>
              <section>
                <h2>{filteredOwners.length} Owners found</h2>
                <Card>
                  <Table striped>
                    <thead>
                    <tr>
                      <th>Name</th>
                      <th className='hidden-sm hidden-xs'>Address</th>
                      <th>City</th>
                      <th>Telephone</th>
                      <th className='hidden-xs'>Pets</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredOwners.map(renderRow)}
                    </tbody>
                  </Table>
                </Card>
              </section>
            </Col>
          </Row>
        </Container>
      </Page.Content>
    </SiteWrapper>
  )
}
