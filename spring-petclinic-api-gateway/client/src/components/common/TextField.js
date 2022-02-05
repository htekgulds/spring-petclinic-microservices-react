import { Col, Form, FormControl, Row } from 'react-bootstrap'

export function TextField({ name, label, value, onChange, error, placeholder }) {
  return (
    <Form.Group as={Row}>
      <Form.Label column sm={2}>{label}</Form.Label>
      <Col sm={10}>
        <FormControl isInvalid={error} name={name} value={value} onChange={onChange} placeholder={placeholder} />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Col>
    </Form.Group>
  )
}
