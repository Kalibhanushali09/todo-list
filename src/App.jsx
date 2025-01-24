import { useEffect, useState } from 'react'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";




function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFInished, setshowFInished] = useState(true)
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {

      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)

    }
  }, [])


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    settodos(newTodos)
    saveToLs()

  }

  const handleDelete = (e, id) => {
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    settodos(newTodos)
    saveToLs()

  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    saveToLs()

  }
  const handlechange = (e) => {
    settodo(e.target.value)

  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    saveToLs


  }

  const saveToLs = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))

  }

  const toggleFinished = (e) => {
    setshowFInished(!showFInished)

  }




  return (
    <>
      <Navbar />
      <div className="md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] mx-3 md:w-1/2">
      <h1 className='text-center font-bold text-xl'>ITask- manage your todos at one place</h1>
        <div className="addtodo flex-col gap-4 my-5">
          <h2 className='text-lg font-bold my-5'>Add a Todo</h2>
          <input onChange={handlechange} value={todo} type="text" className='w-full rounded-lg px-5 py-2' />
          <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-600 disabled:bg-violet-500 hover:bg-violet-800 p-2 py-1 text-sm font-bold text-white rounded-md w-full mt-4'>Save</button>
        </div>
        <input type="checkbox" onChange={toggleFinished} checked={showFInished} className='my-4'/>Show finished
        <h1 className='text-2xl font-bold'>Your Todos</h1>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>no todos displayed</div>}
          {todos.map(item => {
            return(showFInished || item.isCompleted)&& < div key = { item.id } className = "todo flex w-1/2 justify-between my-3" >
              <div className='flex gap-5'>
                <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-600 hover:bg-violet-800 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-600 hover:bg-violet-800 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
              </div>
            </div>


          })}

      </div>


    </div >
    </>
  )
}

export default App
