// ** React Imports
import { useState } from 'react'
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { EyeOff, CheckCircle, CloudOff } from 'react-feather'
import {
  Row,
  Col,
  CardText,
  Button
} from 'reactstrap'
import axiosInstance from "../utility/axiosInstance"

const Product = props => {
  // ** Props
  const { data } = props
  const [status, setStatus] = useState(data.status)

  // ** Handle Move/Add to cart
  const handleCartBtn = (val) => {
    axiosInstance.put(`/space/update`, {
      _id: data._id,
      space : {
        status: val
      }
    }).then((res) => {
        if (res.status === 200) {
          setStatus(val)
        }
    })
  }

  // ** Condition btn tag
  const CartBtnTag = data.isInCart ? Link : 'button'

  return (
    <Row className='my-2'>
      <Col className='d-flex align-items-center justify-content-center mb-2 mb-md-0' md='5' xs='12'>
        <div className='d-flex align-items-center justify-content-center'>
          <img className='img-fluid product-img' src={data.spaceImages[0].downloadUrl} alt={data.name} />
        </div>
      </Col>
      <Col md='7' xs='12'>
        <h4>{data.basicInfo.title}</h4>
        <CardText tag='span' className='item-company'>
          By
          <a className='company-name' href='/' onClick={e => e.preventDefault()}>
            {` ${data.basicInfo.user_id.firstName} ${data.basicInfo.user_id.lastName}`}
          </a>
        </CardText>
        <div className='ecommerce-details-price d-flex flex-wrap mt-1'>
          <h4 className='item-price mr-1'>${data.costing.pricePerHour}</h4>
        </div>
        <CardText>
          <span className='text-success ml-25'>{data.location.building_name}</span>
        </CardText>
        <CardText>{data.basicInfo.description}</CardText>
        <ul className='product-features list-unstyled'>
            <li>
              {/*<ShoppingCart size={19} />*/}
              <span> Area Space: {data.area.spaceAreaM2}</span>
            </li>
          {/*<li>*/}
          {/*  <DollarSign size={19} />*/}
          {/*  <span>{data.costing.pricePerHour}</span>*/}
          {/*</li>*/}
        </ul>
        <hr />
        <div className='product-color-options'>
          <h6>Status</h6>
          <ul className='list-unstyled mb-0'>
            {status === "pending" ? <Button
                tag={CartBtnTag}
                disabled
                className='btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0'
                color='success'
                /*eslint-enable */
            >
              {'Pending'}
            </Button> : null}

            {status === "listed" ? <Button
                tag={CartBtnTag}
                disabled
                className='btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0'
                color='primary'
                /*eslint-enable */
            >
              {'Listed'}
            </Button> : null}
            {status === "hidden" ?  <Button
                tag={CartBtnTag}
                disabled
                className='btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0'
                color='danger'
                /*eslint-enable */
            >
              {'Hidden'}
            </Button> : null}
          </ul>
        </div>
        <hr />
        <ul className='list-unstyled mb-0'>
          {status === "pending" ? null : <Button
              tag={CartBtnTag}
              className='btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0'
              color='success'
              onClick={() => handleCartBtn("pending")}
          >
            <CloudOff className='mr-50' size={14} />
            {'Pending it'}
          </Button>}

          {status === "listed" ? null : <Button
              tag={CartBtnTag}
              className='btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0'
              color='primary'
              onClick={() => handleCartBtn("listed")}
          >
            <CheckCircle className='mr-50' size={14} />
            {'List it'}
          </Button>}
          {status === "hidden" ? null : <Button
              tag={CartBtnTag}
              className='btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0'
              color='danger'
              onClick={() => handleCartBtn("hidden")}
          >
            <EyeOff className='mr-50' size={14} />
            {'Hide it'}
          </Button>}
        </ul>
      </Col>
    </Row>
  )
}

export default Product
