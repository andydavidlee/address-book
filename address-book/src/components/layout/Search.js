import React, { useState} from 'react';

const Search = ({ getQuery }) => {
  // Text is a string, setText is the update Function.
  const [text, setText] = useState('');
  
  const onChange = q => {
    // console.log(q);
    setText(q);
    getQuery(q);
  }
  
  return (
    <section className='inputcolour'>
      <form>
        <input 
          type="text"
          className='form-control'
          autoFocus
          value={text}
          onChange={(e) => onChange(e.target.value)}
        />
      </form>
        <Row>
            <Col md={6}>
                <Form.Group controlId='search' className='form-inline'>
                    <Form.Label className= 'text-white mr-3'>Search: </Form.Label>
                        <Form.Control
                            className='inputcolour'  
                            type= 'text'
                            name= 'search'
                            autoFocus
                            value={text}
                            onChange={(e) => onChange(e.target.value)}
                            />
                        </Form.Group>   
            </Col>
        </Row>
    </section>
  )
}

export default Search
