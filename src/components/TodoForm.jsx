import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardText, CardActions, CardTitle} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Toggle from "material-ui/Toggle";
import TimePicker from 'material-ui/TimePicker';
import Divider from "material-ui/Divider";

import {
	createTodo,
	inputTitle,
	inputTitleDanger,
	inputDescript,
	setImportance,
	setDeadlineDate,
	setFullDayDeadline,
	setDeadlineTime
} from 'states/todo-actions.js';

class TodoForm extends React.Component {
    static propTypes = {
        inputTitleValue: PropTypes.string,
        inputTitleDanger: PropTypes.bool,
		inputDescriptValue: PropTypes.string,
		inputImportance: PropTypes.number,
		inputFullDayDeadline: PropTypes.bool,
		inputDeadlineDate: PropTypes.instanceOf(Date),
		inputDeadlineTime: PropTypes.instanceOf(Date),
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.handleInputTitleChange = this.handleInputTitleChange.bind(this);
		this.handleInputDescriptChange = this.handleInputDescriptChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
		this.handleImportanceChange = this.handleImportanceChange.bind(this);
		this.handleDeadlineDateChange = this.handleDeadlineDateChange.bind(this);
		this.handleFullDayDeadline = this.handleFullDayDeadline.bind(this);
		this.handleDeadlineTimeChange = this.handleDeadlineTimeChange.bind(this);
    }

	componentWillMount() {
		this.props.dispatch(setImportance(1));
		this.props.dispatch(setDeadlineDate(new Date()));
		this.props.dispatch(setDeadlineTime(new Date()));
	}

    render() {
        const {
			inputTitleValue,
			inputDescriptValue,
			inputTagValue,
			inputImportance,
			inputDeadlineDate,
			inputFullDayDeadline,
			inputDeadlineTime
		} = this.props;
        const inputTitleDanger = this.props.inputTitleDanger ? "Title is required" : "";

        return (
            <div className='todo-form'>
                <Card color='info' className={`d-flex flex-sm-row justify-content-center`}>
					<CardTitle showExpandableButton>
						<TextField type='textarea' value={inputTitleValue}  onChange={this.handleInputTitleChange} hintText="Coding at 4:00a.m....." floatingLabelText="What's next to do?" floatingLabelFixed errorText={inputTitleDanger}/>
					</CardTitle>
					<CardText expandable>
						<TextField type='textarea' value={inputDescriptValue} onChange={this.handleInputDescriptChange} hintText="And get lots of bugs" floatingLabelText="Description" floatingLabelFixed multiLine/>
					</CardText>
					<CardText expandable>
						<TextField type='textarea' value={inputTagValue} onChange={this.handleInputTagChange} hintText="Driving_Crazy" floatingLabelText="Tags" floatingLabelFixed multiLine/>
					</CardText>
					<Divider />
					<CardText expandable>
						<DatePicker floatingLabelText="Due Date" floatingLabelFixed value={inputDeadlineDate} onChange={this.handleDeadlineDateChange} />
						<Toggle label="Full Day" toggled={inputFullDayDeadline} onToggle={this.handleFullDayDeadline} />
						<TimePicker floatingLabelText="Due Time" floatingLabelFixed format="24hr" value={inputDeadlineTime} onChange={this.handleDeadlineTimeChange} disabled={inputFullDayDeadline}/>
					</CardText>
					<Divider />
					<CardText expandable>
						<SelectField floatingLabelText="Importance" floatingLabelFixed value={inputImportance} onChange={this.handleImportanceChange}>
				          <MenuItem value={1} primaryText="Doesn't Matter" />
				          <MenuItem value={2} primaryText="Important" />
					  </SelectField>
					</CardText>
					<CardActions expandable>
						<RaisedButton label="Add" primary={true} onClick={this.handlePost} style={{margin: 18}}/>
					</CardActions>
                </Card>
            </div>
        );
    }

    handleInputTitleChange(e, title) {
        this.props.dispatch(inputTitle(title));
        if (title && this.props.inputTitleDanger) {
            this.props.dispatch(inputTitleDanger(false));
        }
    }

	handleInputDescriptChange(e) {
        const text = e.target.value;
        this.props.dispatch(inputDescript(text));
    }

	handleInputTagChange(e) {
		const text = e.target.value;
		this.props.dispatch(inputTag(text));
	}

    handlePost() {
        const {inputTitleValue, inputDescriptValue, inputImportance, inputDeadlineDate, inputFullDayDeadline, inputDeadlineTime, dispatch} = this.props;
        if (!inputTitleValue) {
            dispatch(inputTitleDanger(true));
            return;
        }
        dispatch(createTodo(inputTitleValue, inputDescriptValue, inputImportance, inputDeadlineDate, inputFullDayDeadline, inputDeadlineTime));
        dispatch(inputTitle(''));
		dispatch(inputDescript(''));
    }

	handleImportanceChange(e, key, val) {
		this.props.dispatch(setImportance(val));
	}

	handleDeadlineDateChange(e, date) {
		this.props.dispatch(setDeadlineDate(date));
	}

	handleFullDayDeadline(e, isChecked) {
		this.props.dispatch(setFullDayDeadline(isChecked));
	}

	handleDeadlineTimeChange(e, time) {
		this.props.dispatch(setDeadlineTime(time));
	}
}

export default connect(state => ({
    ...state.todoForm
}))(TodoForm);
