import React, { useEffect, useState } from 'react'
import './todolist.css';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import {deleteTodoByID,updateDoneState} from '../../features/todoSlice'
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebase';
import { selectUid } from '../../features/userSlice';

const TodoList = ({item,id:todoid,checktodo,doneTodo}) => {
  
    const [checked, setChecked] = useState(doneTodo);
    const dispatch = useDispatch();    
    const uid = useSelector(selectUid);


    useEffect(() => {
      // funcion to insert a new todo in firebase
      if(checktodo){
      
        let data = {
          id:todoid,
          item:item,
          done:checked
        }
        db.collection('users').doc(uid).collection('todos').doc(todoid.toString()).set(data);
      }
    }, []);


    const GreenCheckbox = withStyles({
        root: {
          color: '#fff',
          '&$checked': {
            color: red[600],
          },
        },
        checked: {},
      })((props) => <Checkbox color="default" {...props} />);
    

    const updateTaskState = () => {

      setChecked(!checked);        
      dispatch(updateDoneState({
        id:todoid,
        item:item,
        done:!doneTodo
      }));
      
        //upadte check to firebase
        db.collection('users').doc(uid).collection('todos').doc(todoid.toString()).update({
          done: !doneTodo
        });
      }
      
      const deleteTodo = () => {
        //delete todo from firebase
        dispatch(deleteTodoByID(todoid));
        db.collection('users').doc(uid).collection('todos').doc(todoid.toString()).delete();
    }
    

    return (
        <div className="container-todo">
          <FormControlLabel
            control={<GreenCheckbox checked={doneTodo} onChange={updateTaskState} name="checkedG" />}
            label={''}
            />
          <h3>{item}</h3>
          <div className="icon">
            <i className="fas fa-trash" onClick={deleteTodo}></i>
          </div>
        </div>
    )
}

export default TodoList
