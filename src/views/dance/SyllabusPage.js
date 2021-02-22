import { Row, Col } from 'reactstrap'
import Breadcrumbs from '@src/components/breadcrumbs'
import SimpleCard from "@src/components/card"
import {useEffect, useState} from "react"
import axiosInstance from "../../utility/axiosInstance"

const SyllabusPage = (props) => {
    const [syllabusList, setSyllabusList] = useState([])
    useEffect(() => {
        axiosInstance.get(`/dance/getSyllabus?d_name=${props.location.state.keyword}`)
            .then((res) => {
                if (res.status === 200) {
                    setSyllabusList(res.data)
                }
            })
    }, [])
    return (
        <div id='dashboard-analytics'>
            <Breadcrumbs breadCrumbTitle='Syllabus' breadCrumbParent='Dance' breadCrumbActive='Syllabus' />
            <Row className='match-height'>
                {syllabusList.map((e, index) => {
                    return <SimpleCard name = {e.d_syllabus_name} key = {index} description = {e.d_syllabus_description}
                                       targetAddress={'/video-page'} text = {e.d_id}/>
                })}

            </Row>
        </div>
    )
}

export default SyllabusPage
