import React from 'react';
import { Btn } from './Btn';
import { TextToggle } from './TextToggle';

export function TodoItem(props){

	return (
		<li className="todo-item">
			<div className="checkbox-container">
					<input 
						type='checkbox' 
						onChange={(event) => props.editItem(props.id, props.text, !props.isDone)}
						checked={props.isDone}
					></input>

					<TextToggle
						editItem={(text) => props.editItem(props.id, text, props.isDone)}
						text={props.text}
					></TextToggle>
			</div>
			<Btn
				text="Remove"
				onClick={() => props.removeItem(props.id)}
				className="btn-remove btn"
			></Btn>
		</li>
	);
}