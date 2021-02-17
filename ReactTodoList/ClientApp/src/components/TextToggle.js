import React from 'react';

export class TextToggle extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			text: this.props.text,
			value: this.props.value
		};

		this.onChange = this.onChange.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onDoubleClick = this.onDoubleClick.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	onChange(event) {
		this.setState({
			text: event.currentTarget.value
		});
	}

	onDoubleClick(event) {
		this.setState({
			value: !this.state.value
		});
	}

	onKeyDown(event) {
		if(event.keyCode == 13 || event.keyCode == 27){
			this.setState({
				value: !this.state.value
			});
			
			this.props.onTextChanged(this.state.text);
		}
	}

	onBlur(){
		this.setState({
			value: !this.state.value
		});
		
		this.props.onTextChanged(this.state.text);
	}


	render(){
		
		if(!this.state.value){
			return (
				<label
					onDoubleClick={this.onDoubleClick} 
					className="toggle-text"
				>
					{this.state.text}
				</label>
			);
		}

		return (
			<input 
				type='text' 
				name='toggle-input'
				value={this.state.text}
				onChange={this.onChange}
				onKeyDown={this.onKeyDown}
				onBlur={this.onBlur}
				></input>
		)
	}
}