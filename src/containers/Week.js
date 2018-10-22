import React, {Component} from 'react'
import Day from './Day'

export default class Week extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: null,
            lastId: -1
        };

        this.getEvents = this.getEvents.bind(this);
    }

    componentWillMount() {
        try {
            console.log(localStorage.getItem('lastId'));
            this.setState({
                lastId: parseInt(localStorage.getItem('lastId'))
            });
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.getEvents();
    }

    getEvents() {
        let allEvents = [];
        for (let i = 1; i <= this.state.lastId; i++) {
            try {
                let event = JSON.parse(localStorage.getItem(`event ${i}`));
                allEvents.push(event);
            } catch (e) {
                console.log(`Event with id ${i}, was deleted.`);
            }
        }
        this.setState({
            events: allEvents
        })
    }

    render() {
        let days = [];
        let events = this.state.events ? this.state.events : null;
        let {date} = this.props;

        const {month, selected, select} = this.props;

        for (let i = 0; i < 7; i++) {
            let day = {
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date
            };
            days.push(
                <Day day={day}
                     events={events}
                     key={i}
                     selected={selected}
                     select={select}/>
            );

            date = date.clone();
            date.add(1, "day");
        }

        return (
            <div className="days" key={days[0]}>
                {days}
            </div>
        );
    }
}