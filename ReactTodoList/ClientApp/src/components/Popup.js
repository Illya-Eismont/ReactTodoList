import React from 'react';
import {Btn} from './Btns';

export class Popup extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			isHide: true,
			text: ""
		};

		this.toggleView = this.toggleView.bind(this);
		this.addItem = this.addItem.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	toggleView(){
		this.setState({
			isHide: !this.state.isHide
		});
	}

	onChange(event){
		this.setState({
			text: event.target.value
		});
	}

	async addItem(){
		const res = await fetch(this.props.url + '/Add', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state.text)
		});

		this.props.updateTodoList();
		this.toggleView();

	}

	render(){
		if(this.state.isHide){
			return <Btn text="Add" onClick={this.toggleView} className="add-btn btn"></Btn>
		}

		return (
			<div className="popup">
				<div className="popup-content-container">
					<input type="text" onChange={this.onChange}></input>
					<Btn 
						text="Save"
						onClick={this.addItem}
						className="save-btn btn"
					></Btn>
					
					<Btn
						text="Cancel"
						onClick={this.toggleView}
						className="cancel-btn btn"
					></Btn>
				</div>
			</div>
		);

	}
}