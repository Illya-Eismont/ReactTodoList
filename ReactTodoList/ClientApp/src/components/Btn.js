export function Btn(props) {
	return (
		<button 
			value={props.value || ''} 
			onClick={props.onClick}
			className={props.className}
		>
			{props.text}
		</button>
	);
}