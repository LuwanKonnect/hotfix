import SpaceList from "@src/components/spaceList"
import { Row, Col } from 'reactstrap'

const UserPage = () => {
  return (
      <div id='dashboard-analytics'>
          <Row className='match-height'>
              <Col xs='12'>
                  <SpaceList />
              </Col>
          </Row>
      </div>
  )
}

export default UserPage
