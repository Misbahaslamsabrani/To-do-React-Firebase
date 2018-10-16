import React, {Component} from 'react';
import * as firebase from 'firebase';
import '../config/config';
import Input from '../UIComponents/Input';
import Button from '../UIComponents/Button';
import Items from '../UIComponents/DisplayItems'
class FrontCom extends Component {
    constructor(){
        super()
        this.state={
            todoItem: '',
            todoItems: [],
            editId: null,

        }
        this.ref = firebase.database().ref();
    }
    componentDidMount(){
        this.getTodoItems();
    }
    getTodoItems = () =>{
        this.ref.child("Items").once("value",(snapshot) =>{
            const items = snapshot.val();
            const TempArr = [];
            for(let key in items){
                TempArr.push({id: key,todo: items[key].item});
            }
            this.setState({todoItems: TempArr})
        })
    }
    onAdd = (event) => {
        event.preventDefault();
        if(this.state.todoItem === ''){
            return
        } 
        if(this.state.editId !== null){
        this.ref.child(`Items/${this.state.editId}`).update({item: this.state.todoItem})
        }
        else{
            this.ref.child('Items').push({item: this.state.todoItem})
        }
        this.getTodoItems();
        this.setState({todoItem: '', editId: null})
    }
    
    ondelete = (itemId) => {
        const selectedItem = this.state.todoItems.find((item) => {
            return item.id === itemId;
        })
        if(selectedItem.todo === this.state.todoItem){
            this.setState({todoItem: '', editId: null})
        }
        this.ref.child(`Items/${itemId}`).remove();
        this.getTodoItems();
        

    }
    onEdit = (itemId) => {
        const TemArr = this.state.todoItems.find((todos) => {
            return todos.id === itemId
        });
        this.setState({todoItem: TemArr.todo , editId : itemId}); 
    }

    whenChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name] : value})
    }
    render(){
        const {todoItems} = this.state;
        const todosList = todoItems.length > 0 ? (<table>
            <Items todoItems={todoItems} editItem={this.onEdit} delItem={this.ondelete}/>
            </table>) : (<div className="center red-text">"No, To-do items"</div>)
        return(
            <div className="container blue lighten-5 mybox">
            <nav className="nav-wrapper indigo">
            <div className="center"><h3>To-do App</h3></div>
            </nav>
            <br/>
            <br/>
            <form onSubmit={this.onAdd}>
            <div className="row">
            <div className="col s8 m8 l6 offset-l2">
            <Input  name="todoItem" value={this.state.todoItem} onChange={this.whenChange}/>
            </div>
            <div className="col s2 m2 l2">
            <Button cn="btn light-blue darken-3" text="Add" />
            </div>
            </div>
            </form>
            <br/>
            {todosList}
            
            </div>
        )
    }
}
export default FrontCom;