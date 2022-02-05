import { SiteWrapper } from '../common/SiteWrapper'
import { Card, Container, Page } from 'tabler-react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { TextField } from '../common/TextField'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'

async function getOwner({ queryKey: [, id]}) {
  const res = await axios.get('/api/customer/owners/' + id)
  return res.data
}

const schema = object({
  firstName: string().required(),
  lastName: string().required(),
  address: string().required(),
  city: string().required(),
  telephone: string().required().max(10)
})

export function OwnerFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: owner, isLoading } = useQuery(['owner', id], getOwner, {
    enabled: !!id
  })

  const formik = useFormik({
    initialValues: {
      firstName: owner ? owner.firstName : '',
      lastName: owner ? owner.lastName : '',
      address: owner ? owner.address : '',
      city: owner ? owner.city : '',
      telephone: owner ? owner.telephone : ''
    },
    validationSchema: schema,
    onSubmit: values => {
      console.debug('New Owner Values', values)
      if (owner) {
        axios.put('/api/customer/owners/' + owner.id, values)
          .then(res => console.debug(res.data))
          .catch(err => console.error(err))
      } else {
        axios.post('/api/customer/owners', values)
          .then(res => console.debug(res.data))
          .catch(err => console.error(err))
      }
    },
    enableReinitialize: true
  })

  if (id && !isLoading && !owner) {
    navigate('/owners/new')
    return null
  }

  return (
    <SiteWrapper>
      <Page.Content title={owner ? 'Edit Owner' : 'Add New Owner'}>
        <Container>
          <Row>
            <Col md={12}>
              <Card>
                <Card.Body>
                  <Form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                      <TextField
                        label="First Name"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && formik.errors.firstName}
                      />
                    </div>
                    <div className="mb-4">
                      <TextField
                        label="Last Name"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && formik.errors.lastName}
                      />
                    </div>
                    <div className="mb-4">
                      <TextField
                        label="Address"
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && formik.errors.address}
                      />
                    </div>
                    <div className="mb-4">
                      <TextField
                        label="City"
                        name="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        error={formik.touched.city && formik.errors.city}
                      />
                    </div>
                    <div className="mb-4">
                      <TextField
                        label="Telephone"
                        name="telephone"
                        value={formik.values.telephone}
                        onChange={formik.handleChange}
                        error={formik.touched.telephone && formik.errors.telephone}
                      />
                    </div>
                    <div className="mt-6">
                      <Button color="primary" type="submit" className="mr-4">Submit</Button>
                      <Button as={Link} to={owner ? '/owners/' + owner?.id : '/owners/find'}>Back</Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Page.Content>
    </SiteWrapper>
  )
}
