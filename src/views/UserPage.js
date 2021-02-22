import UserList from "@src/components/list"
import { Row, Col } from 'reactstrap'

const UserPage = () => {
  return (
      <div id='dashboard-analytics'>
          <Row className='match-height'>
              <Col xs='12'>
                  <UserList />
              </Col>
          </Row>
      </div>
  )
}

export default UserPage
