import InputText from "./inputform"
import List from "./list"
import { useState, useEffect } from 'react';


const TodoList = () =>{

    const [inputTextVal, setInputTextVal] = useState('');
    const [todoList, setTodoList] = useState([]);


    useEffect(()=>{
        const localTodoList = localStorage.getItem('todoList');
        if(localTodoList){
            const todoList = JSON.parse(localTodoList);
            setTodoList(todoList);
        }
    },[]);


    const inputTextChangeHandler = (event)=>{
        const textValue = event.target.value;
        setInputTextVal(textValue);
    };

    const buttonClickHandler = ()=>{
        if(inputTextVal.trim()){
            console.log("CLcik add button");
            setInputTextVal('')
            const list = [...todoList];
            // {item:'A, isDone: false}
            const listItem = {
                item:inputTextVal,
                itemEditText:inputTextVal,
                isDone: false,
                isEdit: false,
            }
            list.push(listItem);
            setTodoList(list);
            setInputTextVal('');
        }else{
            setInputTextVal('');
        }
    };

    const inputKeyUpHandler = (event)=>{
        // event.key ===> 'Enter',
        if(event.which === 13){
            buttonClickHandler();
        }
    };

    const isDoneHandler = (listIndex)=>{
        const list = [...todoList];
        list[listIndex].isDone = true;
        setTodoList(list);
    };

    const deleteHandler = (listIndex)=>{
        const list = [...todoList];
        list.splice(listIndex, 1);
        setTodoList(list);
    };

    const swapListItemHandler = (initialIndex, finalIndex) => {
        const list = [...todoList];
        const temp = list[initialIndex];
        list[initialIndex] = list[finalIndex];
        list[finalIndex] = temp;
        setTodoList(list);
    };

    const listItemEditHandler = (listIndex)=>{
        const list = [...todoList];
        list[listIndex].isEdit = true;
        setTodoList(list);
    };

    const listItemEditSubmitHandler = (listIndex)=>{
        const list = [...todoList];
        list[listIndex].item = list[listIndex].itemEditText;
        list[listIndex].isEdit = false;
        setTodoList(list);
    };

    const editChangeHandler = (listIndex, editValue)=>{
        const list = [...todoList];
        list[listIndex].itemEditText = editValue;
        setTodoList(list);
    };

    const editCancelHandler = (listIndex)=>{
        const list = [...todoList];
        list[listIndex].itemEditText = list[listIndex].item;
        list[listIndex].isEdit = false;
        setTodoList(list);
    }


    return(<>
        <InputText 
            onInputTextChange= {inputTextChangeHandler}
            onKeyUpInput={inputKeyUpHandler}
            value = {inputTextVal}
            onButtonClick = {buttonClickHandler} buttonText = "ADD TASK"
        ></InputText>
        
        
        <List todolist ={todoList}
            onClickDone={isDoneHandler}
            onClickDelete={deleteHandler}
            swapListItem={swapListItemHandler}
            onEditClick={listItemEditHandler}
            onEditSubmitClick={listItemEditSubmitHandler}
            onEditCancel={editCancelHandler}
            onChangeEdit={editChangeHandler}
        ></List>
       
        </>
    )
}



export default TodoList;