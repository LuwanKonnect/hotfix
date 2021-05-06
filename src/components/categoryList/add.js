import {useState} from "react"
import {Button, Col, FormGroup, Input, Row, Label, CustomInput, FormFeedback} from "reactstrap"
import {ArrowUp, Plus} from "react-feather"
import NumberInput from '@components/number-input'
import axiosInstance from "../../utility/axiosInstance"
import Swal from "sweetalert2"

export const Adding = () => {
    const [category_name, setName] = useState("")
    const [thumbnail_url, setAddress] = useState("")
    const [nameFeedback, setNameFeedback] = useState(false)
    const [addressFeedback, setAddressFeedback] = useState(false)

    const checkName = () => {
        if (category_name.length === 0) {
            setNameFeedback(true)
        } else {
            setNameFeedback(false)
        }
    }
    const checkAddress = () => {
        if (thumbnail_url.length === 0) {
            setAddressFeedback(true)
        } else {
            setAddressFeedback(false)
        }
    }

    const updateImg = (e) => {
        const file = e.target.files[0]
        const formdata = new FormData()
        formdata.append('image', file)

        // for (const value of formdata.values()) {
        //     console.log(value)
        // }
        // axiosInstance.post('/upload/', formdata).then((res) => {
        //     if (res.status === 200) {
        //         setAddress(res.data.location)
        //         setAddressFeedback(true)
        //     }
        // }).catch((err) => {
        //     console.log(err)
        // })
            const url = 'http://localhost:3000/api/upload'
            fetch(url, {
                method: 'POST',
                body: formdata
                // headers: {
                //     Accept: 'application/json',
                //     'Content-Type': 'multipart/form-data'
                // }
            }).then(response => response.json()).then((res) => {
                if (res.status === 200) {
                    Swal.fire('Saved!', '', 'success')
                    setAddress(res.location)
                }
            })
            .catch(error => console.log(error))
    }
    const addCategory = () => {
        checkName()
        checkAddress()
        if (category_name.length > 0 && thumbnail_url.length > 0) {
            axiosInstance.post('/category/Add', {
                category: {
                    category_name,
                    thumbnail_url
                }
            }).then((res) => {
                console.log(res)
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
        <div style={{display: 'flex', flexDirection: 'row', marginBottom: -13}}>
            <Col className='pt-1 mt-2' xl='1' md='6' sm='12'>
                <FormGroup>
                    <span style={{fontSize: 18}}>Add:</span>
                </FormGroup>
            </Col>
            <Col className='ml-1 pt-1' xl='4' md='6' sm='12'>
                <FormGroup>
                    <Label for='nameInput'>Category Name</Label>
                    <Input type='text' id='nameInput' onBlur = {checkName}
                           value = {category_name} onChange = {e => setName(e.target.value)}
                           placeholder='Enter Name' invalid={nameFeedback}/>
                    <FormFeedback>Please input a name</FormFeedback>
                </FormGroup>
            </Col>
            <Col className='ml-1 pt-1' xl='5' md='6' sm='12'>
                <FormGroup>
                    <Label for='exampleCustomFileBrowser'>Thumbnail</Label>
                    <CustomInput type='file'
                                 id='exampleCustomFileBrowser'
                                 onChange = {(e) => {
                                     updateImg(e)
                                 }}
                                 name='customFile' valid={addressFeedback}/>
                    <FormFeedback valid>Please add a file</FormFeedback>
                </FormGroup>
            </Col>
            {/*<Col className='ml-1 mb-1 pt-1' xl='5' md='6' sm='12'>*/}
            {/*    <FormGroup>*/}
            {/*        <Label for='addressInput'>Thumbnail_url</Label>*/}
            {/*        <Input type='text' id='addressInput' onBlur={checkAddress}*/}
            {/*               value = {thumbnail_url} onChange = {e => setAddress(e.target.value)}*/}
            {/*               placeholder='Enter image Address' invalid={addressFeedback}/>*/}
            {/*        <FormFeedback>Please input a image address</FormFeedback>*/}
            {/*    </FormGroup>*/}
            {/*</Col>*/}

            <Col className='ml-2 pt-1 mt-2' xl='1' md='1' sm='12'>
                <Row>
                    {/*<Button.Ripple className='btn-icon mr-1' md='1' color='gradient-primary' >*/}
                    {/*    <Plus size={16} />*/}
                    {/*    /!*<span className='align-middle ml-25'>Upload</span>*!/*/}
                    {/*</Button.Ripple>*/}
                    <Button.Ripple
                        className='btn-icon' md='2'
                        onClick={() => addCategory()}
                        color='gradient-primary' >
                        <Plus size={16} />
                        {/*<span className='align-middle ml-25'>Upload</span>*/}
                    </Button.Ripple>
                </Row>
            </Col>
        </div>
    )
}
export default Adding
