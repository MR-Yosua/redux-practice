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
// import { db } from '../../firebase';

const TodoList = ({item,id:todoid,checktodo}) => {
  
    const [checked, setChecked] = useState(true);
    
    const dispatch = useDispatch();
    // const lastTodo = useSelector(selectLastTodo);
    
    const uid = useSelector(selectUid);


    useEffect(() => {
      
      if(checktodo){
    
        db.collection('users').doc(uid).collection('todos').add({
            id:todoid,
            item:item,
            done:checked
        })
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
    

    const handleChange = () => {
        setChecked(!checked);
        dispatch(updateDoneState({
          id:todoid,
          item:item,
          done:checked
        }));
      }
      
      const deleteTodo = () => {
        
        dispatch(deleteTodoByID(todoid));
        
    }
    

    return (
        <div className="container-todo">
             <FormControlLabel
                control={<GreenCheckbox checked={checked} onChange={handleChange} name="checkedG" />}
                label={''}
            />
            
                <h3>{item}</h3>
            
            {/* <h3>TodoList Component</h3> */}
            <div className="icon">
              <i className="fas fa-trash" onClick={deleteTodo}></i>
            </div>
        </div>
    )
}

export default TodoList
