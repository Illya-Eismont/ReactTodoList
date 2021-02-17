import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import { Popup } from './components/Popup';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {todoList: []};

    this.updateTodoList = this.updateTodoList.bind(this);
  }

  async updateTodoList(){
    let res = await fetch("https://localhost:44316/Home" + '/GetTodoList', { method: 'POST' });

    if(!res.ok)
    {
      return null;
    }

		res = await res.json();
		this.setState({
			todoList: res.filter(item => !item.isDone).concat(res.filter(item => item.isDone))
		});
  }

  
  componentDidMount(){
    this.updateTodoList();
  }


  render(){

    return (
      <div className="app">
        <Popup
          url="https://localhost:44316/Home"
          updateTodoList={this.updateTodoList}
        ></Popup>
        <TodoList
          todoList={this.state.todoList}
          updateTodoList={this.updateTodoList}
          url="https://localhost:44316/Home"
         ></TodoList>
      </div>
    );
  }
}

export default App;
