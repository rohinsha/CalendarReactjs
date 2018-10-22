import React, {Component} from 'react'

export default class DayNames extends Component {
    render() {
        return (
            <ul className="weekdays">
                <li className="day">Sunday</li>
                <li className="day">Monday</li>
                <li className="day">Tuesday</li>
                <li className="day">Wednesday</li>
                <li className="day">Thursday</li>
                <li className="day">Friday</li>
                <li className="day">Saturday</li>
            </ul>
        );
    }
}