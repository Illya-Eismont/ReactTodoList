import React from 'react';


export class Btn extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<button 
				value={this.props.value || ''} 
				onClick={this.props.onClick}
				className={this.props.className}
			>
				{this.props.text}
			</button>
		);
	}
}

export class BtnRemove extends React.Component {
	constructor(props){
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	async onClick(event){
		const res = await fetch(this.props.url + '/RemoveItem', {
			method: 'POST',
			headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			body: JSON.stringify(this.props.id)
		});

		if(res.ok){
			this.props.onRemove();
		}
	}

	render(){
		return (
			<Btn
				text={this.props.text}
				value={this.props.value}
				onClick={this.onClick}
				className="btn-remove btn"
			>

			</Btn>
		);
	}
}
