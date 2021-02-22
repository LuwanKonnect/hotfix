import { Button, Card, CardTitle, CardBody, CardText, CardImg, Col } from 'reactstrap'
import img1 from '@src/assets/images/slider/02.jpg'
import {Link} from "react-router-dom"

const SimpleCard = (props) => {
    const tem = props.imgURL ? props.imgURL : img1
    return (
        <Col lg='4' md='6'>
            <Card>
                <CardImg top width="100%" height = "300px" src={tem} alt='Card cap' />
                <CardBody>
                    <CardTitle tag='h4'>{props.name}</CardTitle>
                    <CardText>
                        {props.description}
                    </CardText>
                    <Button.Ripple tag={Link} to={{pathname:props.targetAddress,
                    state:{
                        keyword:props.text
                    }
                    }} color='primary' outline>
                        Details
                    </Button.Ripple>
                </CardBody>
            </Card>
        </Col>
    )
}

export default SimpleCard
