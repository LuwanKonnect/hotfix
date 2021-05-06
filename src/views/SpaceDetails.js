// ** React Imports
import { useEffect, Fragment  } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Styles
import { Card, CardBody } from 'reactstrap'
import '@styles/base/pages/app-ecommerce-details.scss'
import '@styles/react/apps/app-users.scss'
import ProductDetails from './ProductDetails'

const UserView = props => {
    // ** Vars
    // const { id } = useParams()
    // console.log(props.location.state)
    const {space} = props.location.state
    // // ** Get suer on mount
    // useEffect(() => {
    //     dispatch(getUser(parseInt(id)))
    // }, [dispatch])

    return (
        <Fragment>
            <div className='app-ecommerce-details'>
                    <Card>
                        <CardBody>
                            <ProductDetails
                                data={space}
                            />
                        </CardBody>
                    </Card>

            </div>
        </Fragment>
    )
}
export default UserView
