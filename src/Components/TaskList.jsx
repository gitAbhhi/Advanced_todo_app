import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, editTodo, toggleTodo } from "../redux/feature/todoSlice";

const TaskList = () => {



  const { todos, showFinished } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");



  const sortedTodos = [...todos].sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const handleEditClick = (id, task) => {
    setEditId(id); // Store the ID of the task being edited
    setEditText(task); // Set the current task text in the input
  };

  const handleEditSave = (id) => {
    if (editText.trim()) {
      dispatch(editTodo({ id, task: editText })); // Update the task in Redux
    }
    setEditId(null); // Exit edit mode
  };



  return (
    <div>
      <h1 className="text-xl font-bold mt-2">Your Todos</h1>
      <div className="todos">
        {sortedTodos.length === 0 && <div>No Todos to display</div>}

        {sortedTodos.map((item) => {
          return (
            (showFinished || !item.isCompleted) && (
              <div
                key={item.id}
                className="task sm:flex items-center w-full justify-between my-3"
              >
                <div className="flex gap-3 items-center">
                  {/* ✅ Checkbox for Marking Completion */}
                  <input
                    name={item.id}
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={() => dispatch(toggleTodo(item.id))}
                    className="mx-2"
                  />

                  {/* ✅ Editable Input Field When Editing */}
                  {editId === item.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onBlur={() => handleEditSave(item.id)} // Save when clicking outside
                      onKeyDown={(e) => e.key === "Enter" && handleEditSave(item.id)} // Save on Enter key
                      className="border border-gray-400 p-1 w-52"
                      autoFocus
                    />
                  ) : (
                    <div>
                      <span
                        onDoubleClick={() => handleEditClick(item.id, item.task)}
                        className={item.isCompleted ? "line-through" : "text-lg"} >
                        {item.task}
                      </span>
                      <span className="ml-4 text-lg font-bold text-gray-600">
                        {item.priority}
                      </span>
                      {item.weather && (
                        <span className="ml-2 text-blue-500">
                          🌤 {item.weather.temperature}°C, {item.weather.description}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="buttons flex h-full  justify-end sm:w-[25%]">
                  {/* ✅ Show "Save" button if editing, otherwise show "Edit" */}
                  {editId === item.id ? (
                    <button
                      onClick={() => handleEditSave(item.id)}
                      className="bg-green-700 text-white text-sm font-bold rounded-full p-3 h-11 ml-12 my-2">
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(item.id, item.task)}
                      className="bg-violet-700 text-white text-sm font-bold rounded-full p-3 h-11 ml-12 my-2">
                      Edit
                    </button>
                  )}

                  {/* Delete Button */}
                  <button
                    onClick={() => dispatch(deleteTodo(item.id))}
                    className="bg-red-700 text-white text-sm font-bold rounded-full p-3 h-11 my-2 mx-1" >
                    Delete
                  </button>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};


export default TaskList;
