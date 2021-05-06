import CategoryList from "@src/components/categoryList"
import { Row, Col } from 'reactstrap'

const UserPage = () => {
    return (
        <div id='dashboard-analytics'>
            <Row className='match-height'>
                <Col xs='12'>
                    <CategoryList />
                </Col>
            </Row>
        </div>
    )
}

export default UserPage
