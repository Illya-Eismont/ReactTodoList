import React from 'react';
import {TodoListItem} from './TodoListItem.js';

export class TodoList extends React.Component {
	constructor(props){
		super(props);

		this.state = {todoList: this.props.todoList};

		this.onRemoveItem = this.onRemoveItem.bind(this);
	}

	onRemoveItem(id){
		this.setState({
			todoList: this.state.todoList.filter(item => item.id != id)
		});
	}

	findIndexById(id){
		for(let i = 0; i < this.state.todoList.length; i++){
			if(this.state.todoList[i].id == id){
				return i;
			}
		}
		
		return -1;
	}

	render(){
		return (	
			<ul className="todo-list-view">
				{
					this.props.todoList.map((item) => {
						return(
							<TodoListItem
								url={this.props.url}
								isDone={item.isDone}
								text={item.text}
								id={item.id}
								key={item.id}
								onRemove={this.onRemoveItem}
								updateTodoList={this.props.updateTodoList}
							></TodoListItem>
						);
					})
				}
			</ul>
		);

	}

}
