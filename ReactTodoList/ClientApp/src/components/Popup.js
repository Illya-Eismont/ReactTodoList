import { useState } from 'react';
import { Btn } from './Btn';

export function Popup(props){
	const [text, setText] = useState('');
	const [isView, setView] = useState(false);

	if(!isView){
		return <Btn text="Add" onClick={() => setView(!isView)} className="add-btn btn"></Btn>
	}

	return (
		<div className="popup">
			<div className="popup-content-container">
				<textarea  onChange={(event) => setText(event.currentTarget.value)}></textarea>
				<Btn 
					text="Save"
					onClick={() => {setView(!isView); props.addItem(text)}}
					className="save-btn btn"
				></Btn>
				
				<Btn
					text="Cancel"
					onClick={() => setView(!isView)}
					className="cancel-btn btn"
				></Btn>
			</div>
		</div>
	);
}