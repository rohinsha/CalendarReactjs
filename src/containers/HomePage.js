import React, {Component} from 'react'
import moment from 'moment'
import DayNames from './DayNames'
import Week from './Week'
import AddEvent from './AddEvent'
import LabelHourlyEvents from './LabelHourlyEvents'

export default class Homepage extends Component {


    constructor(props) {
        super(props);

        this.state = {
            month: moment(),
            selected: moment().startOf('day'),
            timet:'',
            style: {
                "fontSize": "18px"
            },
            isSelect: false
        };

        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
    }

    previous() {
        const {
            month,
        } = this.state;

        this.setState({
            month: month.subtract(1, 'month'),
        });
    }

    next() {
        const {
            month,
        } = this.state;

        this.setState({
            month: month.add(1, 'month'),
        });
    }

    select(day) {
        this.setState({
            isSelect: !this.state.isSelect,
            selected: day.date,
            timeHHMM: moment().format('hh:mm a'),
            month: day.date.clone(),
        });
        //this.props.select(day.date);

    }

    renderWeeks() {
        let weeks = [];
        let done = false;
        let date = this.state.month.clone().startOf("month").add("w" - 1).day("Sunday");
       
        let count = 0;
        let monthIndex = date.month();

        const {
            selected,
            month,
        } = this.state;

        while (!done) {
            weeks.push(
                <Week key={date}
                      date={date.clone()}
                      month={month}
                      select={(day) => {
                        this.select(day);
                      
      }}
                      selected={selected}/>
            );

            date.add(1, "w");

            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }

        return weeks;
    };

    renderMonthLabel() {
        const {
            month,
        } = this.state;
        return <span className="month-label">{month.format("MMMM YYYY")}</span>;
    }

    render() {
        let currentSelect = this.state.isSelect ? this.state.selected : null;
        var stringHour=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        var afternoon="12pm";
        var incafternoon="1pm";
          
        return (
            <div>
                <div className="small-sideblock border">
                    <div className="month">
                        <ul>
                            <li className="prev" onClick={this.previous}>&#10094;</li>
                            <li className="next" onClick={this.next}>&#10095;</li>
                            <li>
                                <span style={this.state.style}>{this.renderMonthLabel()}</span>
                            </li>
                        </ul>
                    </div>
                    <DayNames />
                    {this.renderWeeks()}
                </div>
                <div className="main-block border">
                   <ul>
                        {stringHour.map((item, index) => (
                            <li key={index} className="hours">
                                <span className="border">{item}am</span>
                                <LabelHourlyEvents currentTime={this.state.timeHHMM} selectedDate={currentSelect} startTime={item+"am"} endTime={item+1+"am"} />
                            </li>       
                        ))}    
                            <li className="hours">
                                <span className="border">12pm</span>
                                <LabelHourlyEvents selectTime={this.state.timeHHMM} selectedDate={currentSelect} startTime={afternoon} endTime={incafternoon} />
                            </li>
                        {stringHour.map((item, index) => (
                            <li key={index} className="hours">
                                <span className="border">{item}pm</span>
                                <LabelHourlyEvents selectTime={this.state.timeHHMM} selectedDate={currentSelect} startTime={item+"pm"} endTime={item+1+"pm"} />
                            </li>       
                        ))}    
                   </ul>
                </div>
                    <AddEvent selectTime={this.state.timeHHMM} selectedDate={currentSelect}/>
                    <a className="custom-btns btm-btn2" href="/events">All Events</a>
            </div>
        );
    }
}
