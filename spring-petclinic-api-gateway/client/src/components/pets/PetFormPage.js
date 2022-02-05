import { SiteWrapper } from '../common/SiteWrapper'
import { Card, Container, Page } from 'tabler-react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { number, object, string } from 'yup'
import { useFormik } from 'formik'
import { TextField } from '../common/TextField'
import { SelectField } from '../common/SelectField'

async function getOwner({ queryKey: [, id]}) {
  const res = await axios.get('/api/customer/owners/' + id)
  return res.data
}

async function getPetTypes() {
  const res = await axios.get('/api/customer/petTypes')
  return res.data
}

const schema = object({
  name: string().required(),
  birthDate: string().required(),
  typeId: number().required(),
})

export function PetFormPage() {
  const { id, petId } = useParams()
  const navigate = useNavigate()
  const { data: petTypes = [] } = useQuery('petTypes', getPetTypes)
  const { data: owner, isLoading } = useQuery(['owner', id], getOwner, {
    enabled: !!id
  })
  console.debug('Owner', owner)
  const pet = owner?.pets?.find(i => i.id === Number(petId))

  const formik = useFormik({
    initialValues: {
      name: pet ? pet.name : '',
      birthDate: pet ? pet.birthDate : '',
      typeId: pet ? pet.type.id : 1
    },
    validationSchema: schema,
    onSubmit: values => {
      console.debug('New Pet Values', values)
      const data = {
        id: pet?.id,
        ...values
      }
      if (pet) {
        axios.put('/api/customer/owners/' + owner.id + '/pets/' + pet.id, data)
          .then(res => console.debug(res.data))
          .catch(err => console.error(err))
      } else {
        axios.post('/api/customer/owners/' + owner.id + '/pets', data)
          .then(res => console.debug(res.data))
          .catch(err => console.error(err))
      }
    },
    enableReinitialize: true
  })

  if (id && !isLoading && !owner) {
    navigate('/owners/find')
    return null
  }
  if (id && !isLoading && petId && !pet) {
    navigate('/owners/' + owner.id)
    return null
  }

  return (
    <SiteWrapper>
      <Page.Content title={pet ? 'Edit Pet' : 'Add New Pet'}>
        <Container>
          <Row>
            <Col md={12}>
              <Card>
                <Card.Body>
                  <Form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                      <Row>
                        <Col sm={2}><strong>Owner</strong></Col>
                        <Col sm={10}><strong>{owner?.firstName} {owner?.lastName}</strong></Col>
                      </Row>
                    </div>
                    <div className="mb-4">
                      <TextField
                        label="Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && formik.errors.name}
                      />
                    </div>
                    <div className="mb-4">
                      <TextField
                        label="Birth Date"
                        name="birthDate"
                        value={formik.values.birthDate}
                        onChange={formik.handleChange}
                        error={formik.touched.birthDate && formik.errors.birthDate}
                        placeholder="YYYY-MM-DD"
                      />
                    </div>
                    <div className="mb-4">
                      <SelectField
                        label="Pet Type"
                        name="typeId"
                        value={formik.values.typeId}
                        options={petTypes.map(i => ({ label: i.name, value: i.id }))}
                        onChange={formik.handleChange}
                        error={formik.touched.typeId && formik.errors.typeId}
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
