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

const TodoList = ({item,id:todoid,checktodo,doneTodo}) => {
  
    const [checked, setChecked] = useState(doneTodo);
    // const [deleted, setDeleted] = useState(false);
    const dispatch = useDispatch();
    // const lastTodo = useSelector(selectLastTodo);
    
    const uid = useSelector(selectUid);


    useEffect(() => {
      
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
    

    const handleChange = () => {

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

        // console.log(`doc ${todoid} was changed of ${!checked} to ${checked}`);
      }
      
      const deleteTodo = () => {
        // console.log(todoid);
        dispatch(deleteTodoByID(todoid));

        db.collection('users').doc(uid).collection('todos').doc(todoid.toString()).delete().then(()=>{
          // console.log(`todo ${todoid} Eliminado`);  
        });
    }
    

    return (
        <div className="container-todo">
             <FormControlLabel
                control={<GreenCheckbox checked={doneTodo} onChange={handleChange} name="checkedG" />}
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
