import { useState, useEffect } from 'react'
import './App.css';
import './assets/output.css'

const blueBtn = " bg-blue-500 text-white hover:bg-blue-600"
const redBtn = "bg-red-600 hover:bg-red-500 text-white"
const editBtns = "py-2 px-5 "


const App = () => {

  const [title, setTitle] = useState('')
  const [tasks, setTasks] = useState([])
  const [init, setInit] = useState(true)

  useEffect(() => {
    //Check if localstorage is
    const storedTasks = JSON.parse(window.localStorage.getItem('tasks'))
    // check if storedTasks is not null and is not empty
    if (init) {
      setTasks(storedTasks ? storedTasks : [])
      setInit(false)
    }
  }, [init])

  //UseEffect re-renders application whenever dependency objects are changed
  useEffect(() => {

    //Save to localstorage whenever tasks is updated
    // as long as task is not null (can be empty)
    if (tasks) {
      console.log('save tasks to localstorage')
      window.localStorage.setItem('tasks', JSON.stringify(tasks))
    }

  }, [tasks])

  //Update the state object whenever the field is changed
  const handleTitleChange = (e) => {
    const { value } = e.target
    // console.log(value)
    setTitle(value)
  }

  const handleItemChange = (e) => {
    const { value, name } = e.target
    console.log(name)

    if (tasks.find(t => t["index"] == name).edit) {
      tasks.find(t => t["index"] == name).value = value;
      setTasks([...tasks]);
    }
  }

  //Handles saving to the tasks array
  const handleSubmit = () => {
    console.log('handle submit', title)
    //TODO: Why didn't it re-render when creating the temp container??
    // console.log(...tasks)

    // prevent the addition of an empty string
    if (title.length > 0) {
      // add only if item is not already in list
      if (tasks.filter(i => i.value === title).length < 1) {
        setTasks([...tasks, {value: title, edit: false, index: tasks.length + 1}])
        setTitle('')
      }
    }
  }

  const handleEdit = (e) => {
    //TODO: Edit todo using the es6 find
    const { name } = e.target

    // toggle item for editing
    let item = tasks.find(t => t["index"] == name)
    item.edit = !item.edit;
  }

  const handleRemove = () => {
    //TODO: Remove todo using es6 filter
  }

  return (
    <div className="App bg-blue-400">
      <div>
        <input
          type='text'
          name="task_title"
          value={title}
          placeholder="Add task here"
          onChange={handleTitleChange}
          className="px-2 mt-4"
        />
        <button type="button"
          className={"ml-4 py-1 px-2" + blueBtn}
          onClick={handleSubmit}>
          + Add task
          </button>
      </div>

      <ul className="mt-10">
        {tasks?.length > 0 ? tasks.map(item => (
          <li key={item.index} className="flex flex-row">
            <input className="py-2 px-8 text-white bg-blue-400"
              type="text"
              value={item.value}
              name={item.index}
              onChange={handleItemChange}
            />
            <div className="ml-auto">
              <button type="button"
                className={editBtns + blueBtn}
                onClick={handleEdit}
                name={item.index}
              >Edit</button>
              <button type="button" className={editBtns + redBtn} onClick={handleRemove}>Delete</button>
            </div>
          </li>
        )) : "Nothing in list"}
      </ul>
    </div>
  );
}

export default App;
