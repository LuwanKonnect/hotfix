import { useSkin } from '@hooks/useSkin'
import {Link, Redirect, useHistory} from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import axiosInstance from "../utility/axiosInstance"
import {useState} from "react"
import logoURL from "@src/assets/images/logo/KONNECT_DIGITAL_LOGO.png"
const Login = () => {
  const [skin, setSkin] = useSkin()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [flag, setFlag] = useState("none")
  const history = useHistory()
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/konnectdigital01.png`).default
  const signIn = () => {
    axiosInstance.post('/user/adminLogin', {email, password})
        .then((res) => {
            if (res.status === 200) {
              console.log(res.data)
              history.push({
                pathname: '/home',
                state: {keyword: res.data}
              })
            }
        }).catch((err) => {
            setFlag('block')
        })
  }
  return (
    <div className='auth-wrapper auth-v2'>
      <img className="mt-1" src={logoURL} style={{width:100, marginLeft:5, position:'absolute', top:1, left:1}}/>
      <Row className='auth-inner m-0'>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Welcome to ATOD! 👋
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
            <Form className='auth-login-form mt-2' onSubmit={e => e.preventDefault()}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input type='email' id='login-email'
                       value = {email} onChange = {(e) => {
                          setEmail(e.target.value)
                       }}
                       placeholder='john@example.com' autoFocus />
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <Link to='/'>
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <InputPasswordToggle
                    value = {password} onChange = {(e) => {
                    setPassword(e.target.value)
                }}
                    className='input-group-merge' id='login-password' />
              </FormGroup>
              <h5 className='text-danger' style={{display : flag}}>Invalid email or password!</h5>
              <FormGroup>
                <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='Remember Me' />
              </FormGroup>
              <Button.Ripple onClick={() => {
                signIn()
              }} color='primary' block>
                Sign in
              </Button.Ripple>
            </Form>
            <div className='divider my-2'>
              <div className='divider-text'></div>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
