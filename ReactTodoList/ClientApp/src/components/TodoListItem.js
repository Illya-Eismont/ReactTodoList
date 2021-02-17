import React from 'react';
import { BtnRemove} from './Btns';
import {TextToggle} from './TextToggle';

export class TodoListItem extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			isDone: this.props.isDone,
			text: this.props.text
		};

		this.onChecked = this.onChecked.bind(this);
		this.onTextChanged = this.onTextChanged.bind(this);
	}

	async onChecked(event) {
		const res = await fetch(this.props.url + '/EditItem', {
			method: 'POST',
			headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			body: JSON.stringify({
				Id: this.props.id,
				IsDone: !this.state.isDone,
				Text:	this.state.text
			})
		});

		if(res.ok){

			this.setState({
				isDone: !this.state.isDone
			});

			this.props.updateTodoList(this.props.id);
		}
	}

	async onTextChanged(text){
		const res = await fetch(this.props.url + '/EditItem', {
			method: 'POST',
			headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
			},
			body: JSON.stringify({
					Id: this.props.id,
					Text: text,
					IsDone: this.state.isDone
			})
		});

		if(res.ok){
			this.setState({
				text
			});
		}
	}

	render(){
		return (
			<li className="todo-list-item">
					<input 
						type='checkbox' 
						onChange={this.onChecked}
						checked={this.state.isDone}
					></input>

					<TextToggle
						value={false}
						text={this.state.text}
						onTextChanged={this.onTextChanged}
					></TextToggle>

					<BtnRemove 
						id={this.props.id}
						onRemove={this.props.updateTodoList}
						text="Remove"
						value={this.props.id}
						url={this.props.url}
					></BtnRemove>
			</li>
		);
	}
}