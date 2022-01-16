import reactLogo from './react.svg';
import './App.css';
import { useState, useEffect } from 'react';

const axios = require('axios')



function App() {

  // Get
  const [todoList, setTodoList] = useState([])
  const getList = () => {
    axios.get(`http://127.0.0.1:8000/todo/`)
    .catch(err => console.log(err))
    .then(res => {
      const datos = res.data
      setTodoList(datos)
    })
    }

  // Delete
  const delteTask = (id) => {
    axios.delete(`http://127.0.0.1:8000/todo/${id}`)
    .then(getList())
    getList()
    }

  //post
  const [target, setTarget] = useState({
    "id": null,
    "title" : ""
  })
  const newTask = () =>{
    axios.post(`http://127.0.0.1:8000/todo/`, target)
    .catch(err => console.log(err))
    .then(getList())
  }

  // SET- PUT - UPDATE
  const putTask = ()=>{
    console.log(target)
    axios
    .put(`http://localhost:8000/todo/${target.id}/`, target)
    .catch(err => console.log(err))
    .then(getList());
  }

  const onSubmit = e => {
    if(target.id){
      putTask()
    }else{
      newTask()
    }
    e.preventDefault();
    e.target.reset();
  }

  useEffect(() => {
    getList()
    console.log(target)
  }, [target])

  return (
    <div className="App">
      <header className="App-header">
        <h1> App Todo Django + React + Heroku </h1>      
        <div className="d-flex">
        <img src={reactLogo} className="App-logo" alt="logo" />
        </div>
        <br />

        {/* Formulario */}
            <form className='m-5 ' onSubmit={onSubmit} style={{ minWidth: 400 }} >
                <div className="d-flex py-1 ">
               <input 
                defaultValue={target.title} 
                type="text" className="form-control"
                id="title" 
                onChange={e => setTarget({...target, "title": e.target.value }) } 
                />
               { target.id && // CANCELAR
                <button onClick={() => setTarget({...target, "id" : null}) }            
                  type="button" className="btn btn-secondary ">Cancelar</button>
                }
                </div>
                {/* ADD */}
                <button type="submit" className="btn btn-primary mx-1">
                {target.id ? "Update" : "Add" }            
                </button>                
                <label htmlFor="title" className="form-label"> Task  </label> 
        </form>

        {/* LISTADO */}
        
        <div className="card mt-5" >                  
        <table style={{ minWidth: 500 }} className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Task</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>

            <tbody>
              {todoList.map( (i, ctn) =>                 
                <tr key={i.id}>
                  <th scope="row">{1 + ctn++}</th>
                  <td>{i.title}</td>
                  <td onClick={()=> delteTask(i.id)}> <div className="btn btn-danger"> Del</div> </td>
                  <td onClick={()=> setTarget(i)}> <div className="btn btn-success"> Set</div> </td>
                  <td> </td>
                </tr>
                  )}

            </tbody>
        </table>

        </div>

      </header>



    </div>
  );
}

export default App;
