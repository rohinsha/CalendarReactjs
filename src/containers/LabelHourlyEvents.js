import React, {Component} from 'react';
import _ from 'lodash'
import {history} from '../services/history'

export default class LabelHourlyEvents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newEvent: {
            	startTime:"",
            	endTime:"",
                title: "",
                description: ""
            },
            eventDetails: {
                id: -1,
                day: this.props.selectedDate,
                eventInfo: {}
            },
            display: "none",
            modalContent: ""
        };

        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setLastId = this.setLastId.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.saveEvent = this.saveEvent.bind(this);
    }

    setLastId() {
        if (localStorage.getItem('lastId')) {
            return localStorage.getItem('lastId')
        } else {
            return 1
        }
    }

    handleChange(e) {
        let newEvent = {};
        newEvent[e.target.name] = e.target.value;
        this.setState({
            newEvent: _.extend(this.state.newEvent, newEvent)
        });
    }

    addEvent() {
        let lastId = this.setLastId();
        let event={};
        event.id = parseInt(lastId) + 1;
        event.date = this.props.selectedDate.toString();
        
        event.startTime = this.props.startTime;
        event.endTime = this.props.endTime;
        event.title = this.state.newEvent.title;
        event.description = this.state.newEvent.description;
        return event;
    }

    saveEvent() {
        let event = this.addEvent();
        localStorage.setItem(`event ${ event.id }`, JSON.stringify(event));
        localStorage.setItem('lastId', event.id);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.saveEvent();
        history.push('/');
        window.location.reload();
    }

    modalContent() {
        if (!this.props.selectedDate) {
            return (
                <p> Please select date! </p>
            )
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                <input type="text" name="startTime" value={this.props.startTime} onChange={this.handleChange}
                           placeholder="startTime"/>
                <input type="text" name="endTime" value={this.props.endTime} onChange={this.handleChange}
                           placeholder="endTime"/>
                	<input type="text" name="title" value={this.state.title} onChange={this.handleChange}
                           placeholder="Title"/>
                    <input type="text" name="description" value={this.state.description} onChange={this.handleChange}
                           placeholder="Description"/>
                    <button className="addEvent">Save</button>
                </form>
            )
        }
    }

    closeModal() {
        this.setState({
            display: "none"
        })
    }

    openModal() {
        this.setState({
            display: "block"
        })
    }

    render() {
        let modalStyle = {"display": this.state.display};

        return (
            <div>
                <label data-toggle="modal" onClick={this.openModal}><span>+</span>New Event</label>
                <div id="myModal" className="modal" style={modalStyle}>
                    <div className="modal-content">
                        <span className="close" onClick={this.closeModal}>&times;</span>
                        <div className="form-style-6">
                            <h1>ADD EVENT</h1>
                            {this.modalContent()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
