import React,{useState,useEffect} from 'react'
import{Container,Row,Col,Form,Card} from 'react-bootstrap'
import './Header.css'
const db = require('./testdb.js')

const Header = () => {

  const [search,setSearch] = useState('')
  const [query,setQuery] = useState('')
  const [recipes,setRecipes] = useState([])
  
  useEffect(() => {
    getRecipes()
  },[query])

  const getRecipes = () => {
    setRecipes(db)
  }

  const onUpdate = e => {
    setSearch(e.target.value)
  }

  const onSearch = e => {
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form className='my-5' onSubmit={onSearch}>
            <Form.Control 
              onChange={onUpdate}  
              placeholder='Search for Recipes here'
              value={search}
            >
            </Form.Control>
          </Form>
        </Col>
      </Row>
      <Row>
        {
          recipes.map(({imgURL,title,author}) => 
            <Col className='my-4' lg={4}>
              <Card className='recipeCard'>
                <Card.Img className='img-fluid cardImage ' variant='top' src={imgURL}/>
                <Card.Body className=''>
                  <Card.Title className='text-capitalize cardTitle'>{title}</Card.Title>
                  <Card.Text className=''>By <a href="#">{author}</a></Card.Text>
                  <footer>
                    
                  </footer>
                </Card.Body>
              </Card>
              
            </Col>
          )
        }
      </Row>
    </Container>
  )
}


export default Header