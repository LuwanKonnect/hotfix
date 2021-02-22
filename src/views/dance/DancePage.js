import { Row, Col } from 'reactstrap'
import Breadcrumbs from '@src/components/breadcrumbs'
import SimpleCard from "@src/components/card"
//images
import ballet from "@src/assets/images/pages/dance/ballet/ballet.png"
import contemporary from "@src/assets/images/pages/dance/contemporary/Contemporary.jpg"
import hiphop from "@src/assets/images/pages/dance/hiphop/Hip_Hop.jpg"
import jazz from "@src/assets/images/pages/dance/jazz/jazz.png"
import musicalTheatre from "@src/assets/images/pages/dance/musicalTheatre/MusicalTheatre.jpg"
import streetBeat from "@src/assets/images/pages/dance/streetBeat/StreetBeat.jpg"
import tap from "@src/assets/images/pages/dance/tap/Tap.jpg"
import nationalCharacter from "@src/assets/images/pages/dance/nationalCharacter/nationalCharacter.png"


const DancePage = () => {
    return (
        <div id='dashboard-analytics'>
            <Breadcrumbs breadCrumbTitle='Dances' breadCrumbParent='Dance' breadCrumbActive=''/>
            <Row className='match-height'>
                <SimpleCard name={'Jazz'} description = {"description"}
                            targetAddress={'/syllabus-page'} text = {'Jazz'} imgURL = {jazz}/>
                <SimpleCard name={'Classical Ballet'} description = {"description"}
                            targetAddress={'/syllabus-page'} text = {'Classical Ballet'} imgURL = {ballet}/>
                <SimpleCard name={'Contemporary'} description = {"description"}
                            targetAddress={'/syllabus-page'} text = {'Contemporary'} imgURL = {contemporary}/>
                <SimpleCard name={'Hip-Hop'} description = {"description"}
                            targetAddress={'/syllabus-page'} text = {'Hip-Hop'} imgURL = {hiphop}/>
                <SimpleCard name={'National Character'} description = {"description"}
                            targetAddress={'/syllabus-page'} text = {'National Character'} imgURL = {nationalCharacter}/>
                <SimpleCard name={'Street Beat Tap'} description = {"description"}
                            targetAddress={'/syllabus-page'} text = {'Street Beat Tap'} imgURL = {streetBeat}/>
                <SimpleCard name={'Tap'} description = {"description"}
                            targetAddress={'/syllabus-page'} text = {'Tap'} imgURL = {tap}/>
                <SimpleCard name={'Musical Theatre'} description = {"description"}
                            targetAddress={'/syllabus-page'} text = {'Musical Theatre'} imgURL = {musicalTheatre}/>
            </Row>
        </div>
    )
}

export default DancePage
