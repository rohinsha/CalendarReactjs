import React, {Component} from 'react'

export default class Day extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCount: false,
            display: "none",
            modalContent: ""
        };

        this.countEvents = this.countEvents.bind(this);
        this.showEvents = this.showEvents.bind(this);
    }

    showEvents(events) {
        if (events.length === 0) {
            alert('There is no any events');
        } else {
            events.forEach(function (key, index) {
                alert(key.title)
            })
        }
    }

    countEvents(date) {
        let myEvents = {
            count: 0,
            events: [],
            style: 'notExist'
        };

        if (this.props.events && !this.state.isCount) {
            this.props.events.forEach(function (key, index) {
                if (key) {
                    if (key.date === date) {
                        myEvents.count++;
                        myEvents.events.push(key);
                        myEvents.style = 'exist';
                    }
                }
            });
        }

        return myEvents;
    }

    render() {
        let className = "";
        
        const {
            day,
            day: {
                date,
                isCurrentMonth,
                isToday,
                number,
            },
            selected,
            select
        } = this.props;

        if (isToday && isCurrentMonth) {
            className = "activeDate"
        } else if (date.toString() === selected.toString()) {
            className = "active"
        }
        else {
            className = ""
        }

        return (
            <div>
                <li
                    key={date.toString()}
                    className={ className }
                    onClick={() => select(day)}>{number}</li>
                <span onClick={() => this.showEvents(this.countEvents(date.toString()).events)}
                      className={  this.countEvents(date.toString()).style }>{ this.countEvents(date.toString()).count }
                    EVENTS</span>
            </div>
        );
    }
}