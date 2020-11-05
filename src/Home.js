import React, { useState } from 'react'
import { TextField, Switch, Button, Select, InputLabel } from '@material-ui/core';
import { Row, Navbar, NavbarBrand } from "reactstrap";
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import Swal from 'sweetalert2'
import { connect } from 'react-redux';
import { onChangeInput ,onChangeselect,getInitialState} from './redux/action'

function Form(props) {
    const [errors, setError] = useState({})

    const handleClick = () => {
        if (validate()) {
            const { title, summary, event, category, sdate, stime, checked, edate, etime, site } = props
            const data = {
                title: title,
                summary: summary,
                site: site,
                event: event,
                category: category,
                checked: checked,
                sdate: sdate,
                edate: edate,
                stime: stime,
                etime: etime,
            }
            Swal.fire({
                icon: 'success',
                title: 'Form is submitted successfully',
            })
            console.log("clicked", data)
            props.getInitialState()
            
        }
        else {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill mandatory Fields',
            })
        }
    }

    const handlechange = (e) => {
        props.onChangeInput(e.target.value, e.target.id)
    }

    const handlechecked = (e) => {
        props.onChangeselect(e.target.checked)
    }

    const validate = () => {
        const { title, summary, event, sdate, stime, category, edate, etime, site } =props
        let errors = {};
        let formIsValid = true;
        if (event.trim() === '') {
            formIsValid = false
            errors["event"] = 'This field is required'
        }
        if (category.trim() === '') {
            formIsValid = false
            errors["category"] = 'This field is required'
        }
        if (title.trim() === '') {
            formIsValid = false
            errors["title"] = 'Title is required'
        }
        if (summary.trim() === '') {
            formIsValid = false
            errors["summary"] = 'Summary  is required'
        }
        if (sdate.trim() === '') {
            formIsValid = false
            errors["sdate"] = 'This field  is required'
        }
        if (stime.trim() === '') {
            formIsValid = false
            errors["stime"] = 'This field  is required'
        }
        if (site.trim() === '') {
            formIsValid = false
            errors["site"] = 'This field  is required'
        }
        var today = new Date()
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes()
        today = yyyy + '-' + mm + '-' + dd;

        if (edate <= today) {
            if (etime > time) {
                formIsValid = false
                errors["edate"] = 'End Time can not be grater than current Time '
            }
        }
        else {
            formIsValid = false
            errors["edate"] = 'End date can not be grater than current date '
        }
        setError(errors)
        return formIsValid;

    };

    return (
        <div>
            <Navbar style={{ backgroundColor: "orange", opacity: "0.6", minHeight: "50px", alignItems: "center" }} >
                <NavbarBrand >Advancing for Humanity</NavbarBrand>
            </Navbar>

            <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                <Row>

                    <div style={{ float: 'right' }}>
                        <Button variant="contained" onClick={handleClick} size="small" color="primary" type="submit" >
                            Create</Button>{" "}
                        <Button variant="contained" size="small" type="submit" >
                            Cancel</Button>
                    </div>
                    <h2 style={{ color: "blue" }}>Create Event </h2>
                </Row>
                <hr />
            </div>

            <div style={{ margin: "auto", maxWidth: "35%", marginTop: '20px', padding: "50px" }} >

                <Row >
                    <InputLabel required htmlFor="event" >Add Event in</InputLabel>
                </Row>

                <Row >
                    <Select
                        native
                        value={props.event}
                        onChange={handlechange}
                        id="event"
                        fullWidth={true}  >
                        <option aria-label="None" value="" />
                        <option value={"a"}>A</option>
                        <option value={"b"}>B</option>
                        <option value={"c"}>C</option>
                        <option value={"d"}>D</option>
                    </Select>
                    <p style={{ color: "red", fontSize: "14px" }}>{errors["event"]}</p>


                </Row>
                <Row >
                    <TextField
                        required
                        id="title"
                        label="Title"
                        value={props.title}
                        type="text"
                        margin="normal"
                        fullWidth={true}
                        inputProps={{
                            maxLength: 250
                        }}
                        helperText={`(${props.title.length}/${250})`}
                        onChange={handlechange}

                    />
                    <p style={{ color: "red", fontSize: "14px" }}>{errors["title"]}</p>
                </Row>
                <Row >

                    <InputLabel required htmlFor="category" >Categories</InputLabel>
                </Row>
                <Row>

                    <Select
                        native
                        value={props.category}
                        onChange={handlechange}
                        id="category"
                        fullWidth={true}  >
                        <option aria-label="None" value="" />
                        <option value={"1"}>one</option>
                        <option value={"2"}>Tow</option>
                        <option value={"3"}>Three</option>
                        <option value={"4"}>Four</option>
                    </Select>
                    <p style={{ color: "red", fontSize: "14px" }}>{errors["category"]}</p>


                </Row>
                <Row>
                    <TextField
                        required
                        inputProps={{
                            maxLength: 500
                        }}
                        helperText={`(${props.summary.length}/${500})`}
                        id="summary" label="Short Summary"
                        type="text" margin="normal"
                        value={props.summary}
                        multiline
                        rows={4}
                        fullWidth={true}
                        onChange={handlechange} />
                    <p style={{ color: "red", fontSize: "14px" }}>{errors["summary"]}</p>
                </Row>
                <Row>

                    <label> Type: Public</label>
                </Row>
                <Row >
                    <TextField
                        required
                        inputProps={{
                            maxLength: 1024
                        }}
                        helperText={`(${props.site.length}/${1024})`}
                        id="site"
                        label="Registration site"
                        value={props.site}
                        type="text"
                        margin="normal"
                        fullWidth={true}
                        onChange={handlechange}
                    />
                    <p style={{ color: "red", fontSize: "14px" }}>{errors["site"]}</p>
                </Row>
                <Row >
                    <label> Is this a virtual event ? yes
                                   <Switch
                            checked={props.checked}
                            onChange={handlechecked}
                            id="checked"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </label>
                </Row>
                <Row >

                    <TextField
                        id="link"
                        label="Online link"
                        value={props.link}
                        type="url"
                        margin="normal"
                        fullWidth={true}
                        onChange={handlechange}
                    />
                </Row>

                <Row >
                    <TextField
                        required
                        id="sdate"
                        label="Start Date"
                        type="date"
                        value={props.sdate}
                        onChange={handlechange}

                    />
                    {" "}
                    <TextField
                        required
                        id="stime"
                        label="Start Time"
                        type="time"
                        value={props.stime}
                        onChange={handlechange}

                        inputProps={{
                            step: 300, // 5 min
                        }}
                    />
                </Row>
                <br />
                <Row >
                    <TextField
                        required
                        id="edate"
                        label="End Date"
                        type="date"
                        value={props.edate}
                        onChange={handlechange}
                    />
                    {" "}
                    <TextField
                        required
                        id="etime"
                        label="End time"
                        type="time"
                        value={props.etime}
                        onChange={handlechange}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                    />
                </Row>
                <p style={{ color: "red", fontSize: "14px" }}>{errors["edate"]}</p>
                <br />
                <Row>
                    <label>Attachments</label>
                </Row>
                <Row >
                    <Dropzone
                        styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
                    />
                </Row>
                <p style={{ color: "gray" }}>Use option on the right top screen to save your changes</p>
                
            </div>
            <div className="scrolltop" style={{float:"right" ,paddingRight:"10%",}} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                <i className="fa fa-angle-up fa-4x"   />
            </div>
        </div>
    )

}
function mapStateToProps(state) {
    return {
        title: state.title,
        summary: state.summary,
        site: state.site,
        link: state.link,
        event: state.event,
        category: state.category,
        checked: state.checked,
        sdate: state.sdate,
        edate: state.edate,
        stime: state.stime,
        etime: state.etime,
        selectedFile: state.selectedFile,
        files: state.files,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        onChangeInput: (input, id) => { dispatch(onChangeInput(input, id)) },
        onChangeselect: (input) => { dispatch(onChangeselect(input)) },
        getInitialState: () => { dispatch(getInitialState()) }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);