import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import { TextField, Switch, Button, Select, InputLabel } from '@material-ui/core';
import { Row } from "reactstrap";
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'


export default class Form extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            title: "",
            summary: "",
            site: "",
            link: "",
            event: "",
            category: "",
            checked: true,
            sdate: "2020-05-24",
            edate: "2020-11-04",
            stime: "07:30",
            etime: "07:30",
            errors: {},
            selectedFile: null,
            files: [],

        })
    }
    handleClick = () => {
        if (this.validate()) {
            const { title, summary, event, category, sdate, stime, checked, edate, etime, site } = this.state
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
            console.log("clicked", data)
            this.setState({
                title: "",
                summary: "",
                site: "",
                link: "",
                event: "",
                category: "",
                checked: true,
                sdate: "2020-05-24",
                edate: "2020-11-04",
                stime: "07:30",
                etime: "07:30",
            })
        }
    }

    onChangeInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onChangeSelect = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    validate() {
        const { title, summary, event, category, edate, etime, site } = this.state
        let errors = {};
        let formIsValid = true;
        if (event.trim() === '') {
            formIsValid = false

            errors["event"] = 'this field is required'

        }
        if (category.trim() === '') {
            formIsValid = false

            errors["category"] = 'this field is required'

        }
        if (title.trim() === '') {
            formIsValid = false

            errors["title"] = 'Title is required'

        }

        if (summary.trim() === '') {
            formIsValid = false

            errors["summary"] = 'Summary  is required'

        }
        if (site.trim() === '') {
            formIsValid = false

            errors["site"] = 'This field  is required'

        }
        var today = new Date()
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
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
        this.setState({ errors: errors });
        return formIsValid;

    };

    handleChangeStatus = ({ meta }, status) => {
        console.log(status, meta)
    }

    handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }

    render() {
        return (
            <div>
                <Card style={{ maxWidth: "700px", margin: "auto", marginTop: "100px", padding: "50px" }}>
                    <div style={{ margin: "auto", maxWidth: "70%" }} >

                        <Row >
                            <InputLabel required htmlFor="event" >Add Event in</InputLabel>
                        </Row>

                        <Row >
                            <Select
                                native
                                value={this.state.event}
                                onChange={this.onChangeSelect}
                                id="event"
                                fullWidth={true}  >
                                <option aria-label="None" value="" />
                                <option value={"a"}>A</option>
                                <option value={"b"}>B</option>
                                <option value={"c"}>C</option>
                                <option value={"d"}>D</option>
                            </Select>
                            <p style={{ color: "red", fontSize: "14px" }}>{this.state.errors["event"]}</p>


                        </Row>
                        <Row >
                            <TextField
                                required
                                id="title"
                                label="Title"
                                value={this.state.title}
                                type="text"
                                margin="normal"
                                fullWidth={true}
                                inputProps={{
                                    maxLength: 250
                                }}
                                helperText={`(${this.state.title.length}/${250})`}
                                onChange={this.onChangeInput}

                            />
                            <p style={{ color: "red", fontSize: "14px" }}>{this.state.errors["title"]}</p>
                        </Row>
                        <Row >

                            <InputLabel required htmlFor="category" >Categories</InputLabel>
                        </Row>
                        <Row>

                            <Select
                                native
                                value={this.state.category}
                                onChange={this.onChangeSelect}
                                id="category"
                                fullWidth={true}  >
                                <option aria-label="None" value="" />
                                <option value={"1"}>one</option>
                                <option value={"2"}>Tow</option>
                                <option value={"3"}>Three</option>
                                <option value={"4"}>Four</option>
                            </Select>
                            <p style={{ color: "red", fontSize: "14px" }}>{this.state.errors["category"]}</p>


                        </Row>
                        <Row>
                            <TextField required inputProps={{
                                maxLength: 500
                            }}
                                helperText={`(${this.state.title.length}/${500})`} id="summary" label="Short Summary" type="text" margin="normal" value={this.state.summary} multiline rows={4} fullWidth={true} onChange={this.onChangeInput} />
                            <p style={{ color: "red", fontSize: "14px" }}>{this.state.errors["summary"]}</p>
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
                                helperText={`(${this.state.title.length}/${1024})`}
                                id="site"
                                label="Registration site"
                                value={this.state.site}
                                type="text"
                                margin="normal"
                                fullWidth={true}
                                onChange={this.onChangeInput}
                            />
                            <p style={{ color: "red", fontSize: "14px" }}>{this.state.errors["site"]}</p>
                        </Row>
                        <Row >
                            <label> Is this a virtual event ? yes
                                   <Switch
                                    checked={this.state.checked}
                                    onChange={() => {
                                        this.setState({
                                            checked: !(this.state.checked)
                                        })
                                    }}
                                    name="checkedA"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </label>
                        </Row>
                        <Row >

                            <TextField
                                id="link"
                                label="Online link"
                                value={this.state.link}
                                type="url"
                                margin="normal"
                                fullWidth={true}
                                onChange={this.onChangeInput}
                            />
                        </Row>

                        <Row >
                            <TextField
                                id="sdate"
                                label="Start Date"
                                type="date"
                                value={this.state.sdate}
                                onChange={this.onChangeInput}

                            />
                            {" "}
                            <TextField
                                id="stime"
                                label="Start Time"
                                type="time"
                                value={this.state.stime}
                                onChange={this.onChangeInput}

                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                        </Row>
                        <br />
                        <Row >
                            <TextField
                                id="edate"
                                label="End Date"
                                type="date"
                                value={this.state.edate}
                                onChange={this.onChangeInput}

                            />

                            {" "}
                            <TextField
                                id="etime"
                                label="End time"
                                type="time"
                                value={this.state.etime}
                                onChange={this.onChangeInput}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                        </Row>
                        <p style={{ color: "red", fontSize: "14px" }}>{this.state.errors["edate"]}</p>
                        <br />
                        <Row>
                            <label>Attachments</label>
                        </Row>
                        <Row >
                            <Dropzone
                                onChangeStatus={this.handleChangeStatus}
                                onSubmit={this.handleSubmit}
                                styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
                            />
                        </Row>

                        <br />
                        <Row  >
                            <Button variant="contained" onClick={this.handleClick} size="large" color="primary" type="submit" >
                                Creat</Button>
                            <Button variant="contained" size="large" type="submit" >
                                Cancel</Button>
                        </Row>
                        <br />
                    </div>
                </Card>
            </div>
        )
    }
}