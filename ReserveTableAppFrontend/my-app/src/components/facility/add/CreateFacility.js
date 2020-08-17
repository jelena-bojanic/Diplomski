import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import  {facilites} from '../../../RoutesConstants';
import { Switch } from '@material-ui/core';
import Select from 'react-select';
import './CreateFacility.css';
import { addFacility } from '../../../rest/restCallsFacility';
import Swal from 'sweetalert2'

const options = [
    { value: 'RESTAURANT', label: 'RESTAURANT' },
    { value: 'CAFE', label: 'CAFE' },
  ];

class CreateFacility extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onSwitchChange = this.onSwitchChange.bind(this);
        this.create = this.create.bind(this);
        this.state = {
            name:'',
            city:'',
            street:'',
            petFriendly:false,
            startWorkingHours:'',
            endWorkingHours:'',
            contactNumber:'',
            stringFiles:undefined,
            type:'',     
        }
      }
    
    handleChange(e) {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    }

    onSelectChange(e) {
        console.log(e);
        this.setState({ type: e.value});
    }

    onSwitchChange(e) {
    if(this.state.petFriendly === 'true'){
        this.setState({petFriendly:'false'});
    }else{
        this.setState({petFriendly:'true'});
    }
    }

    fileChangedHandler = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener(
              "load",
              () =>
                this.setState({
                  stringFiles: reader.result,
                }),
              false
            );
            reader.readAsDataURL(e.target.files[0]);
          }
      }
      

    create(e){
        e.preventDefault();
        if(this.state.startWorkingHours === '' || this.state.endWorkingHours === ''){
            Swal.fire({
                text: `You didn't enter start and end working hours!Try again` ,
                icon: 'error',
                confirmButtonText: 'Continue'
              });
              return;
        }

        var f = {
            name: this.state.name,
            city:this.state.city,
            street:this.state.street,
            petFriendly:this.state.petFriendly,
            startWorkingHours:this.state.startWorkingHours,
            endWorkingHours: this.state.endWorkingHours,
            contactNumber:this.state.contactNumber,
            type:this.state.type,
            files : this.state.stringFiles,    
        }
        if(this.state.type === ""){f.type= options[0].value}
        addFacility(f);
        this.props.history.push(`${facilites}`);
    }

   render(){
       return(
       <div style={{display:'flex',flexDirection:'column'}}>
           <Card>
               <Form onSubmit={this.create}>
                    <Form.Group className="inputGroup">
                        <Form.Label>Name</Form.Label>
                        <Form.Control className="inputFiled" required name="name" type="text" placeholder="Enter name" className="input" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="inputGroup">
                        <Form.Label>City</Form.Label>
                        <Form.Control className="inputFiled" required name="city" type="text" placeholder="Enter city" className="input" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="inputGroup">
                        <Form.Label>Street (name and number)</Form.Label>
                        <Form.Control className="inputFiled" required name="street" type="text" placeholder="Enter street" className="input" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="inputGroup">
                        <Form.Label>Contact number</Form.Label>
                        <Form.Control className="inputFiled" required name="contactNumber" type="number" placeholder="Enter contact number" className="input" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="inputGroup">
                        <Form.Label>Pet friendly</Form.Label>
                        <Switch
                        onChange={this.onSwitchChange}
                        name="petFriendly"
                        color="primary"
                        />
                    </Form.Group>
                    <Form.Group className="inputGroup">
                        <Form.Label>Facility type</Form.Label>
                        <Select
                            onChange={this.onSelectChange}
                            options={options}
                            name="type"
                            className="inputFiled"
                            defaultValue={options[0]}
                        />
                    </Form.Group>
                    <Form.Group className="inputGroup">
                        <Form.Label>Enter start and end working hours</Form.Label> <br/>
                        <input type="time" min="08:00" step="300" name="startWorkingHours" onChange={this.handleChange} ></input>
                        <input style={{marginLeft:'2%'}} step="300" type="time" label="End working hours" min="01:00" name="endWorkingHours" onChange={this.handleChange} ></input>
                    </Form.Group>
                    <Form.Group className="inputGroup">
                        <br/>
                        <Button className="submitButton" variant="outline-dark" type="submit">Create</Button>
                    </Form.Group>
               </Form>
           </Card>
       </div>
       );
    }
  
}
export default withRouter(CreateFacility);

