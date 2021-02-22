import {Row, Col, Alert, Badge, UncontrolledDropdown, Button, Modal, ModalHeader, ModalBody, ModalFooter,
    DropdownToggle, DropdownMenu, DropdownItem, Table, FormGroup, Label, Input, FormText} from 'reactstrap'
import Breadcrumbs from '@src/components/breadcrumbs'
import SimpleCard from "@src/components/card"
import {useEffect, useState} from "react"
import axiosInstance from "../../utility/axiosInstance"
import {Edit, MoreVertical, Trash} from "react-feather"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import AddVideo from "@src/components/video/addVideo"
import {Link} from "react-router-dom"

const MySwal = withReactContent(Swal)

const VideoPage = (props) => {
    // v_id, v_name, v_address, v_image, v_lock
    const [videoList, setVideoList] = useState([])
    const [editVideoComponent, setEditVideoComponent]  = useState(null)
    useEffect(() => {
        axiosInstance.get(`/dance/getVedio?d_id=${props.location.state.keyword}`)
            .then((res) => {
                if (res.status === 200) {
                    setVideoList(res.data)
                }
            })
    }, [])

    const deleteVideo = (e) => {
        return MySwal.fire({
            title: 'Alert!',
            text: 'This operation will delete the user!',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-danger ml-1'
            },
            buttonsStyling: false,
            showCancelButton: true,
            showLoaderOnConfirm: true,
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.delete(`/dance/deleteVideo?v_id=${e}`)
                    .then((res) => {
                        if (res.status === 200) {
                            Swal.fire('Deleted!', '', 'success').then((res) => {
                                if (res.isConfirmed) {
                                    location.reload()
                                }
                            })

                        }
                    })
            }
        })
    }

    return (
        <div id='dashboard-analytics'>
            <Breadcrumbs breadCrumbTitle='Videos' breadCrumbParent='Dance' breadCrumbParent2='Syllabus' breadCrumbActive='video' />
            <Row className='match-height'>
                <AddVideo d_id={props.location.state.keyword} />
                <Table responsive>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Image</th>
                        <th>LockStatus</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {videoList.map((element, index) => {
                        return <tr key = {index}>
                            <td>
                                <span className='align-middle font-weight-bold'>{element.v_name}</span>
                            </td>
                            <td>{element.v_address}</td>
                            <td>
                                {element.v_image}
                            </td>
                            <td>
                                {element.v_lock === 0 ? (<Badge pill color='light-primary' className='mr-1'>
                                    unlock
                                </Badge>) : (<Badge pill color='light-danger' className='mr-1'>
                                    lock
                                </Badge>)}

                            </td>
                            <td>
                                <UncontrolledDropdown>
                                    <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                        <MoreVertical size={15} />
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem href='/' tag={Link} to={{pathname:'/editVideo-page',
                                            state:{
                                                element
                                            }
                                        }}>
                                            <Edit className='mr-50' size={15} /> <span className='align-middle'>Edit</span>
                                        </DropdownItem>
                                        <DropdownItem  onClick={e => deleteVideo(element.v_id)}>
                                            <Trash className='mr-50' size={15} /> <span className='align-middle'>Delete</span>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </td>
                        </tr>
                    })}

                    </tbody>
                </Table>
                {editVideoComponent}
            </Row>
        </div>
    )
}

export default VideoPage
