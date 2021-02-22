import {useState} from "react"
import {Button, Col, FormGroup, Input, Row, Label, CustomInput, FormFeedback} from "reactstrap"
import {ArrowUp, Plus} from "react-feather"
import NumberInput from '@components/number-input'
import axiosInstance from "../../utility/axiosInstance"
import Swal from "sweetalert2"
import { useHistory } from "react-router-dom"
import {baseUrl} from "../../configs/urlConfig"

const EditVideo = (props) => {
    const video = props.location.state.element
    const [v_name, setName] = useState(video.v_name || "")
    const [v_address, setAddress] = useState(video.v_address || "")
    const [v_image, setImage] = useState(video.v_image || "")
    const [v_lock, setlock] = useState(video.v_lock || 0)
    const [lockFeedback, setLockFeedback] = useState(video.v_lock !== 0)
    const [nameFeedback, setNameFeedback] = useState(false)
    const [addressFeedback, setAddressFeedback] = useState(false)
    const [imageFeedback, setImageFeedback] = useState(false)
    const history = useHistory()
    // const imageAddress = `${baseUrl}${video.v_image.replace('\\', '/')}`
    const [imageAddress, setImageAddress] = useState(`${baseUrl}${video.v_image.replace('\\', '/')}`)
    const checkLock = () => {
        if (lockFeedback) {
            setLockFeedback(!lockFeedback)
            setlock(0)
        } else {
            setLockFeedback(!lockFeedback)
            setlock(1)
        }
    }

    const checkName = () => {
        if (v_name.length === 0) {
            setNameFeedback(true)
        } else {
            setNameFeedback(false)
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
                setImageAddress(`${baseUrl}${res.data.path.replace('\\', '/')}`)
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

    const updateVideo = () => {
        console.log(v_image)
        checkName()
        checkAddress()
        if (v_name.length > 0 && v_address.length > 0) {
            axiosInstance.put('/dance/updateVideo', {
                d_id: video.d_id,
                v_id: video.v_id,
                v_name,
                v_address,
                v_image,
                v_lock
            }).then((res) => {
                if (res.status === 200) {
                    Swal.fire('Saved!', '', 'success').then((res) => {
                        if (res.isConfirmed) {
                            history.push({
                                pathname: '/video-page',
                                state: {keyword: video.d_id}
                            })
                        }
                    })
                }
            })
        }
    }

    const imageStyle = {
        width:400,
        padding:20,
        borderRadius:10,
        backgroundColor:"#ffffff"
        // backgroundColor:"rgb(37, 150, 190)"
    }

    return (
        <Row className='match-height ml-5 pl-4' >
            <Col className='ml-1 mt-1 pt-1 mr-3' xl='4' md='4' sm='12'>
                <Label for='imagePlay'>Image review:</Label>
                <div id="imagePlay" className='mt-1'><img src={imageAddress} style={imageStyle}/></div>
            </Col>
            <Col className='ml-3 mb-1 pt-1' xl='6' md='6' sm='12'>
                <Row>
                    <Col className='ml-1 mb-1 pt-1' xl='10' md='10' sm='12'>
                        <FormGroup>
                            <Label for='nameInput'>Name:</Label>
                            <Input type='text' id='nameInput' onBlur = {checkName}
                                   value = {v_name} onChange = {e => setName(e.target.value)}
                                   placeholder='Enter Name' invalid={nameFeedback}/>
                            <FormFeedback>Please input a name</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col className='ml-1 mb-1 pt-1' xl='10' md='10' sm='12'>
                        <FormGroup>
                            <Label for='addressInput'>Video Address:</Label>
                            <Input type='text' id='addressInput' onBlur={checkAddress}
                                   value = {v_address} onChange = {e => setAddress(e.target.value)}
                                   placeholder='Enter Video Address' invalid={addressFeedback}/>
                            <FormFeedback>Please input a video address</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col className='ml-1 mb-1 pt-1' xl='10' md='10' sm='12'>
                        <FormGroup>
                            <Label for='exampleCustomFileBrowser'>Image:</Label>
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


                    <Col className='ml-2 mb-1 pt-1' xl={{ size: 3, offset: 6 }} md={{ size: 3, offset: 3 }} sm='4'>
                        <FormGroup>

                            {/*<Input type='text' id='basicInput'*/}
                            {/*       value = {v_lock} onChange = {e => setlock(e.target.value)}*/}
                            {/*       placeholder='1 is Lock, 0 is no' />*/}
                            {/*<Label for='basic-number-input'>Lock? 1 is Lock, 0 is No</Label>*/}
                            {/*<NumberInput id='basic-number-input'*/}
                            {/*             min = {0}*/}
                            {/*             max = {1}*/}
                            {/*             value={v_lock}*/}
                            {/*             onChange={count => setlock(count)} />*/}
                            <CustomInput inline type='checkbox' className='mt-1'
                                         id='exampleCustomCheckbox2'
                                         onChange={(e) => {
                                             checkLock()
                                         }}
                                         checked = {lockFeedback}
                                         label='lock' />
                        </FormGroup>
                    </Col>
                    <Col className='ml-2 mb-1 pt-1' xl='3' md='3' sm='12'>
                        <Row>
                            {/*<Button.Ripple className='btn-icon mr-1' md='1' color='gradient-primary' >*/}
                            {/*    <Plus size={16} />*/}
                            {/*    /!*<span className='align-middle ml-25'>Upload</span>*!/*/}
                            {/*</Button.Ripple>*/}
                            <Button.Ripple
                                className='btn-icon' md='2'
                                onClick={() => updateVideo()}
                                color='gradient-primary' >
                                <ArrowUp size={16} />
                                {/*<span className='align-middle ml-25'>Upload</span>*/}
                            </Button.Ripple>
                        </Row>
                    </Col>
                </Row>
            </Col>

        </Row>
    )
}
export default EditVideo
