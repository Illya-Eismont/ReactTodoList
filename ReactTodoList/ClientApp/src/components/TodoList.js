import React from 'react';
import { baseUrl } from './BaseUrl';
import { Popup } from './Popup';
import { TodoItem } from './TodoItem';

export class TodoList extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			todoList: []
		}

		this.update = this.update.bind(this);
		this.addItem = this.addItem.bind(this);
		this.editItem = this.editItem.bind(this);
		this.removeItem = this.removeItem.bind(this);

	}

	async update(){
    let res = await fetch( `${baseUrl}/Get`, { method: 'GET' });

    if(!res.ok)
    {
      return [];
    }

		res = await res.json();
		this.setState({
			todoList: res.filter(item => !item.isDone).concat(res.filter(item => item.isDone))
		});
  }

	async addItem(text){
		if(!text.length){
			return;
		}

		const res = await fetch(`${baseUrl}/Post`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(text)
		});

		if(res.ok){
			this.update();
		}
	}

	async editItem(id, text, isDone){
		const res = await fetch(`${baseUrl}/Put`, {
			method: 'PUT',
			headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
			},
			body: JSON.stringify({
					Id: id,
					Text: text,
					IsDone: isDone
			})
		});

		if(res.ok){
			this.update()
		}
	}

	async removeItem(id){
		const res = await fetch(`${baseUrl}/Delete`, {
			method: 'Delete',
			headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			body: JSON.stringify(id)
		});

		if(res.ok){
			this.update();
		}
	}


  componentDidMount(){
    this.update();
  }

	render(){
		return (
			<div className="todo-list-container">
				<Popup addItem={this.addItem}></Popup>
				<ul className="todo-list">
					{
						this.state.todoList.map((item) => {
								return(
									<TodoItem
										isDone={item.isDone}
										text={item.text}
										id={item.id}
										key={item.id}
										removeItem={this.removeItem}
										editItem={this.editItem}
									></TodoItem>
								);
							})
						}
				</ul>
			</div>
		);
	}

}