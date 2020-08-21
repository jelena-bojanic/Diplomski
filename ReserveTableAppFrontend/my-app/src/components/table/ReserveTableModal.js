import React from "react";
import { Card, Spinner, Form, Button, Modal,Col, Row } from "react-bootstrap";
import Select from 'react-select';
import { withRouter } from "react-router-dom";
import { Calendar, momentLocalizer,Navigate,Views } from 'react-big-calendar';
import './ReserveTableModal.css';
import moment from 'moment';
import Swal from 'sweetalert2'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { createR } from "../../rest/restCallsFacility";
import { reservations } from "../../RoutesConstants";
moment.locale('en-GB');
const localizer = momentLocalizer(moment)

const optionsMinutes = [
    { value: '30', label: '30' },
    { value: '00', label: '00' },
];

const optionsHours = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
];

let formats = {
    timeGutterFormat: 'HH:mm',
    eventTimeRangeFormat: ({
        start,
        end
      }, culture, local) =>
      local.format(start, 'HH:mm', culture) + '-' +
      local.format(end, 'HH:mm', culture),
    dayFormat: 'dd:mm:yyyy',
    agendaTimeRangeFormat: ({
        start,
        end
      }, culture, local) =>
      local.format(start, 'HH:mm', culture) + '-' +
      local.format(end, 'HH:mm', culture),
    agendaDateFormat: 'dd:mm:yyyy',

  }


class ReserveTableModal extends React.Component {

    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onHoursChange = this.onHoursChange.bind(this);
        this.onMinutesChange = this.onMinutesChange.bind(this);

        this.state = {
            today : new Date().toISOString(),
            events : [],
            minutes:optionsMinutes[1].value,
            hours:optionsHours[0].value,
            now : moment().format("HH:mm"),
            timeH:'',
            timeM: '',
            endOfShit:false,
            closed:false,
        }

    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    onMinutesChange(e) {
        this.setState({ minutes: e.value});
    }

    onHoursChange(e) {
        this.setState({ hours: e.value});
    }

    componentDidMount(){
        var minutesNow = moment();

        if(minutesNow.minutes() === '30' || minutesNow.minutes() > 30 ){
            var hoursString = moment().hours().toString();
            var number = parseInt(hoursString) + 1;
            this.setState({timeH:number,timeM:0});          
        }
        if(minutesNow.minutes() === '00' || (minutesNow.minutes() > 0 && minutesNow.minutes() < 30)){
            var time = moment().add(30,'minutes');
            this.setState({timeH:time.hours(),timeM:30});
            console.log('im here');
        }

        if(minutesNow.minutes() > this.props.facility.endWorkingHours[0]){
            this.setState({closed:true});
        }
        
        var startWork = moment().hours(this.props.facility.startWorkingHours[0]).minutes(this.props.facility.startWorkingHours[1]);
        
        if(minutesNow.isBefore(startWork)){
           this.setState({timeH:startWork.hours(),timeM:startWork.minutes()});
        }

    }


handleSlotSelect(slotInfo) {

    var durInMin = parseInt(this.state.hours)*60 + parseInt(this.state.minutes);

    var startResevation = moment().hours(slotInfo.slots[0].getHours()).minutes(slotInfo.slots[0].getMinutes());
    var endResevation = moment().hours(slotInfo.slots[0].getHours()).minutes(slotInfo.slots[0].getMinutes()).seconds(0).add(durInMin,'minutes');;

    var filtered = [];
    var isokay = true;
    this.props.table.reservationList.forEach(event => {
        
        var eventStart = moment().hours(event.startDate.getHours()).minutes(event.startDate.getMinutes());
        var eventEnd = (moment().hours(event.endDate.getHours()).minutes(event.endDate.getMinutes()));

        if((startResevation.isBefore(eventStart)) && (endResevation.isAfter(eventEnd))){
            filtered.push(event);
            isokay = false;
        }
        if((startResevation.isBefore(eventStart)) && endResevation.isBefore(eventEnd) && endResevation.isAfter(eventStart)){
            filtered.push(event);
            isokay=false;
        }
        
    });

    if(startResevation.isBefore(moment())){
        isokay = false;
    }



    if(isokay){
        Swal.fire({
            text: `Are you sure you want to make a reservation that will start at ${slotInfo.start.toTimeString().split(' ')[0]} and end ${endResevation.format("HH:mm:ss")}` ,
            icon: 'success',
            confirmButtonText: 'Continue'
        }).then((result) => {
            if (result.value) {
                console.log(slotInfo.start.toTimeString().split(' ')[0]);
               var  reservation = {customerEmail: this.props.user.email,table_id: this.props.table.id,startReservation: slotInfo.start.toTimeString().split(' ')[0], duration: durInMin }
               console.log(reservation);
               createR(reservation);
               this.handleClose();
               this.props.history.push(`${reservations}`);

            }
          })
        
    }else{
        Swal.fire({
            text: `Not able to reserve at this time.You likely chose time that has passed or duration of your stay exceeds other reservations for this table.Pick a smaller duration or another time` ,
            icon: 'error',
            confirmButtonText: 'Continue'
          });
          return;
    }
}


    render() {
        console.log(new Date(parseInt(this.state.today.substring(0,4)), parseInt(this.state.today.substring(5,7))-1, parseInt(this.state.today.substring(8,11)),parseInt(this.state.timeH),parseInt(this.state.timeM), 0));
        return (
                <div>           
                <Button variant="outline-dark" onClick={this.handleShow} style={{float:'center'}}>Reserve</Button>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered="true"
                    style={{marginTop:'4%'}}
                >
                    <Modal.Body>
                        
                    <Form.Group as={Col}>
                        <Form.Label>By clicking on one timeslot you are choosing the beging of your reservation.Below you can 
                            choose duration of your reservation.If you don't enter duration,your reservation will be made with a duration of 1 hour.
                        </Form.Label>
                        
                        <Form.Label style={{marginRight:'2%'}}>Hours</Form.Label>
                        <Select
                            onChange={this.onHoursChange}
                            options={optionsHours}
                            className="inputFiled"
                            placeholder="hours"
                            label= "Hours"
                        />
                        
                        <Form.Label style={{marginTop:'2%'}}l>Minutes</Form.Label>
                        <Select
                            onChange={this.onMinutesChange}
                            options={optionsMinutes}
                            className="inputFiled"
                            placeholder="Minutes"  
                        />
                        <div style={{height:'80px'}}>

                        </div>
                         
                    </Form.Group>
                            
                            <Calendar
                            localizer={localizer}
                            formats={formats}
                            events={this.props.table.reservationList}
                            timeslots={1}
                            step={30}
                            views={['day']}
                            defaultView='day'
                            defaultDate={new Date(parseInt(this.state.today.substring(0,4)), parseInt(this.state.today.substring(5,7))-1, parseInt(this.state.today.substring(8,11)),8,0, 0)}
                            toolbar={false}
                            selectable={true}
                            min= {new Date(parseInt(this.state.today.substring(0,4)), parseInt(this.state.today.substring(5,7))-1, parseInt(this.state.today.substring(8,11)),parseInt(this.props.facility.startWorkingHours[0]),parseInt(this.props.facility.startWorkingHours[1]), 0)}
                            max = {new Date(parseInt(this.state.today.substring(0,4)), parseInt(this.state.today.substring(5,7))-1, parseInt(this.state.today.substring(8,11)),this.props.facility.endWorkingHours[0],this.props.facility.endWorkingHours[1]-30, 0)}
                            startAccessor="startDate"
                            endAccessor="endDate"
                            style={{height:'500px'}}
                            onSelectSlot={(slotInfo) =>
                                this.handleSlotSelect(slotInfo)
                            }
                            onSelectEvent={event =>

                                Swal.fire({
                                    title: "Not avaliable.",
                                    text: '',
                                    type: "error",
                                    button: true,
                                    icon: "error"
                                  })
                                }
                            />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
export default withRouter(ReserveTableModal);