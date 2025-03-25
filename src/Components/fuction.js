const [task, settask] = useState("")
const [todos, setTodos] = useState([])
const [showfinished, setshowfinished] = useState(true)

useEffect(() => {
  let todoString = localStorage.getItem("todos")
  if (todoString) {
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
  }
}, [])

const saveTols = () => {
  localStorage.setItem("todos", JSON.stringify(todos))
}
const togglefinished = () => {
  setshowfinished(!showfinished)
}
const handleedit = (e, id) => {
  let t = todos.filter(i => i.id === id)
  settask(t[0].task)
  let newTodos = todos.filter(item => {
    return item.id !== id
  });
  setTodos(newTodos)
  saveTols()
}

const handledelete = (e, id) => {
  let newTodos = todos.filter(item => {
    return item.id !== id
  });
  setTodos(newTodos)
  saveTols()
}

const handleadd = () => {
  setTodos([...todos, { id: uuidv4(), task, isCompleted: false }])
  settask("")
  saveTols()
}

const handlechange = (e) => {
  settask(e.target.value)
}

const handlecheckbox = (e) => {
  let id = e.target.name;
  let index = todos.findIndex(item => {
    return item.id === id;
  })
  let newTodos = [...todos];
  newTodos[index].isCompleted = !newTodos[index].isCompleted;
  setTodos(newTodos)
  saveTols()
}