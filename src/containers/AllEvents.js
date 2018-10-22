import React, {Component} from 'react'
import Pagination from 'react-js-pagination'
import _ from 'lodash'
import EventsJson from './EventsJson'

export default class AllEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
            currentPage: 1,
            lastId: -1,
            events: [],
            count: 0,
            display: "none",
            editEvent: null,
            newEvent: {
                startTime:"",
                endTime:"",
                title: "",
                description: ""
            },
            editIndex: -1
        };

        this.deleteEvent = this.deleteEvent.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onChangeItem = this.onChangeItem.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addEvent = this.addEvent.bind(this);

    }

    componentWillMount() {
        let lastId = null;
        try {
            lastId = localStorage.getItem('lastId');
            this.setState({
                lastId: lastId
            })
        } catch (e) {
            console.log(e)
        }
    }

    componentDidMount() {
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
            events: allEvents,
            count: allEvents.length,
            
        })
    }

    onChangeItem(index, item) {
        this.setState({
            display: "block",
            editEvent: item,
            editIndex: index
        })
    }

    closeModal() {
        this.setState({
            display: "none"
        })
    }

    handleChange(e) {
        let newEvent = {};
        newEvent[e.target.name] = e.target.value;
        this.setState({
            newEvent: _.extend(this.state.newEvent, newEvent)
        });
    }

    addEvent() {
        let event={};
        event.id = this.state.editEvent.id;
        event.date = this.state.editEvent.date.toString();
        event.startTime=this.state.newEvent.startTime;
        event.endTime=this.state.newEvent.endTime;
        event.title = this.state.newEvent.title;
        event.description = this.state.newEvent.description;

        return event;
    }

    handleSubmit(e) {
        e.preventDefault();
        this.deleteEvent(this.state.editIndex, this.state.editEvent.id);
        let newEvent = this.addEvent();
        localStorage.setItem(`event ${this.state.editEvent.id}`, JSON.stringify(newEvent));
        window.location.reload();
        
    }

    deleteEvent(index, id) {
        let {events} = this.state;
        events.splice(index, 1);
        this.setState({
            events: events
        });
        localStorage.removeItem(`event ${id}`);
    }

    handlePageChange(pageNumber) {
        this.setState({
            currentPage: pageNumber
        });
        window.scrollTo(0, 0)
    }

    render() {
        let title = this.state.editEvent ? this.state.editEvent.title : "";
        let description = this.state.editEvent ? this.state.editEvent.description : "";
        let startTime=this.state.editEvent ? this.state.editEvent.startTime :"";
        let endTime=this.state.editEvent ? this.state.editEvent.endTime :"";
        let modalStyle = {"display": this.state.display};
        let events = this.state.events;
        
        return (
            <div className="product-list">
         
                <div className="container">
                    <div className="raw">
                        <table>
                            <tbody>
                            <tr>
                                <th>ID</th>
                                <th>TITLE</th>
                                <th>DESCRIPTION</th>
                                <th>DATE</th>
                                <th>STARTTIME</th>
                                <th>ENDTIME</th>
                                <th>EDIT</th>
                                <th>DELETE</th>
                            </tr>
                            
                            {
                                _.map(events, (item, key) => {
                                    if (item) {
                                        return (
                                            <tr key={key}>
                                                <td>{item.id}</td>
                                                <td>{item.title}</td>
                                                <td>{item.description}</td>
                                                <td>{item.date}</td>
                                                <td>{item.startTime}</td>
                                                <td>{item.endTime}</td>
                                                <td>
                                                    <button className="blue-btns" name={item.id} onClick={() => this.onChangeItem(key, item)}>
                                                        Edit
                                                    </button>
                                                </td>
                                                <td>
                                                    <button className="blue-btns" name={item.id}
                                                            onClick={() => this.deleteEvent(key, item.id)}>Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                })
                            }
                            <EventsJson />
                            </tbody>
                        </table>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="container">
                    <div className="clearfix">
                        <div className="text-center">
                            <Pagination
                                activePage={this.state.currentPage}
                                totalItemsCount={this.state.count}
                                innerClass="pagination pagination-lg"
                                prevPageText="<"
                                nextPageText=">"
                                firstPageText="<<"
                                lastPageText=">>"
                                itemsCountPerPage={10}
                                onChange={this.handlePageChange}
                            />
                        </div>
                    </div>
                </div>
                <div id="myModal" className="modal high" style={modalStyle}>
                    <div className="modal-content">
                        <span className="close" onClick={this.closeModal}>&times;</span>
                        <div className="form-style-6">
                            <h1>EDIT EVENT</h1>
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" name="startTime" value={this.props.startTime} onChange={this.handleChange} placeholder={startTime} />
                                <input type="text" name="endTime" value={this.props.endTime} onChange={this.handleChange} placeholder={endTime} />
                
                                <input type="text" name="title" value={this.state.title}
                                       onChange={this.handleChange}
                                       placeholder={title}/>
                                <input type="text" name="description" value={this.state.description}
                                       onChange={this.handleChange}
                                       placeholder={description}/>
                                <button className="addEvent">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
                <a className="custom-btns btm-btn3" href="/">Calendar</a>
            </div>
        )
    }
}

