import {useState} from "react"
import {Button, Col, FormGroup, Input, Row, Label, CustomInput, FormFeedback} from "reactstrap"
import {ArrowUp, Plus} from "react-feather"
import NumberInput from '@components/number-input'
import axiosInstance from "../../utility/axiosInstance"
import Swal from "sweetalert2"

const AddVideo = (props) => {
    const [v_name, setName] = useState(props.v_name || "")
    const [v_address, setAddress] = useState(props.v_address || "")
    const [v_image, setImage] = useState(props.v_image || "")
    const [v_lock, setlock] = useState(props.v_lock || 0)
    const [lockFeedback, setLockFeedback] = useState(false)
    const [nameFeedback, setNameFeedback] = useState(false)
    const [addressFeedback, setAddressFeedback] = useState(false)
    const [imageFeedback, setImageFeedback] = useState(false)

    const checkName = () => {
        if (v_name.length === 0) {
            setNameFeedback(true)
        } else {
            setNameFeedback(false)
        }
    }
    const checkLock = () => {
        if (lockFeedback) {
            setLockFeedback(!lockFeedback)
            setlock(0)
        } else {
            setLockFeedback(!lockFeedback)
            setlock(1)
        }
    }
    const checkAddress = () => {
        if (v_address.length === 0) {
            setAddressFeedback(true)
        } else {
            setAddressFeedback(false)
        }
    }

    const updateImg = (e) => {
        const file = e.target.files[0]
        const formdata = new FormData()
        formdata.append('fileData', file)

        for (const value of formdata.values()) {
            console.log(value)
        }
        axiosInstance.post('/user/uploadPhoto', formdata).then((res) => {
            if (res.status === 200) {
                setImage(res.data.path)
                setImageFeedback(true)
            }
        }).catch((err) => {
            console.log(err)
        })
        // const url = 'http://localhost:3000/user/uploadPhoto'
        // fetch(url, {
        //     method: 'POST',
        //     body: formdata,
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'multipart/form-data'
        //     }
        // }).then(response => response.json()).then((res) => {
        //     if (res.status === 200) {
        //         console.log(res.path)
        //     }
        // })
    .catch(error => console.log(error))
    }

    const addVideo = () => {
        console.log(v_image)
        checkName()
        checkAddress()
        if (v_name.length > 0 && v_address.length > 0) {
            axiosInstance.post('/dance/addVideo', {
                d_id: props.d_id,
                v_name,
                v_address,
                v_image,
                v_lock
            }).then((res) => {
                if (res.status === 200) {
                    Swal.fire('Saved!', '', 'success').then((res) => {
                        if (res.isConfirmed) {
                            location.reload()
                        }
                    })
                }
            })
        }
    }

    return (
        <>
            <Col className='ml-1 mb-1 pt-1' xl='2' md='6' sm='12'>
                <FormGroup>
                    {/*<Label for='nameInput'>Name</Label>*/}
                    <Input type='text' id='nameInput' onBlur = {checkName}
                           value = {v_name} onChange = {e => setName(e.target.value)}
                           placeholder='Enter Name' invalid={nameFeedback}/>
                    <FormFeedback>Please input a name</FormFeedback>
                </FormGroup>
            </Col>
            <Col className='ml-1 mb-1 pt-1' xl='2' md='6' sm='12'>
                <FormGroup>
                    {/*<Label for='addressInput'>Address</Label>*/}
                    <Input type='text' id='addressInput' onBlur={checkAddress}
                           value = {v_address} onChange = {e => setAddress(e.target.value)}
                           placeholder='Enter Video Address' invalid={addressFeedback}/>
                    <FormFeedback>Please input a video address</FormFeedback>
                </FormGroup>
            </Col>
            <Col className='ml-1 mb-1 pt-1' xl='4' md='6' sm='12'>
                <FormGroup>
                    {/*<Label for='exampleCustomFileBrowser'>Custom File Input</Label>*/}
                    <CustomInput type='file'
                                 id='exampleCustomFileBrowser'
                                 onChange = {(e) => {
                                     updateImg(e)
                                 }}
                                 name='customFile' valid={imageFeedback}/>
                    <FormFeedback valid>Please input a video address</FormFeedback>
                </FormGroup>
                {/*<FormGroup>*/}
                {/*    /!*<Label for='imgInput'>Image</Label>*!/*/}
                {/*    <Input type='text' id='imgInput'*/}
                {/*           value = {v_image} onChange = {e => setImage(e.target.value)}*/}
                {/*           placeholder='Click Plus button, Update Image' disabled/>*/}
                {/*</FormGroup>*/}
            </Col>


            <Col className='ml-2 mb-1 pt-1' xl='1' md='6' sm='12'>
                <FormGroup>
                    <CustomInput inline type='checkbox' className='mt-1'
                                 id='exampleCustomCheckbox2'
                                 onChange={(e) => {
                                     checkLock()
                                 }}
                                 label='lock' />
                    {/*<NumberInput id='basic-number-input'*/}
                    {/*             min = {0}*/}
                    {/*             max = {1}*/}
                    {/*             value={v_lock}*/}
                    {/*             onChange={count => setlock(count)} />*/}
                    {/*<Label for='basic-number-input'>Lock? 1 is Lock, 0 is No</Label>*/}
                </FormGroup>
            </Col>
            <Col className='ml-2 mb-1 pt-1' xl='1' md='1' sm='12'>
                <Row>
                    {/*<Button.Ripple className='btn-icon mr-1' md='1' color='gradient-primary' >*/}
                    {/*    <Plus size={16} />*/}
                    {/*    /!*<span className='align-middle ml-25'>Upload</span>*!/*/}
                    {/*</Button.Ripple>*/}
                    <Button.Ripple
                        className='btn-icon' md='2'
                        onClick={() => {
                            if (props.v_name) {
                                updateVideo()
                            } else {
                                addVideo()
                            }
                        }}
                        color='gradient-primary' >
                        <ArrowUp size={16} />
                        {/*<span className='align-middle ml-25'>Upload</span>*/}
                    </Button.Ripple>
                </Row>
            </Col>
        </>
    )
}
export default AddVideo
