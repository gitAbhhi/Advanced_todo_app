import React from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleShowFinished, fetchWeather } from '../redux/feature/todoSlice';
import { v4 as uuidv4 } from "uuid";

const TaskInput = () => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("High"); // Default priority
  const [activity, setActivity] = useState("Indoor"); // Default priority
  const { todos, showFinished } = useSelector((state) => state.todos);
  const { weather, weatherLoading, weatherError } = useSelector(state => state.todos);
  const dispatch = useDispatch();



  // Handle Add task
  const handleadd = async () => {
    if (task.trim()) {
      let weatherData = null;
      if (activity === "Outdoor") {
        await dispatch(fetchWeather("New Delhi")); // Fetch weather for Outdoor tasks
        weatherData = weather;
      }
      dispatch(addTodo({ id: uuidv4(), task, priority, activity, weather: weatherData, isCompleted: false }));
      setTask("");
      setPriority("High");  // Reset priority
      setActivity("Indoor"); // Reset priority
    }
  };
  return (
    <div>
      <div className='sm:text-lg md:text-xl lg:text-2xl mt-2 px-3 font-bold'>Add a Todo</div>

      {/* Task Input Section */}
      <input value={task} onChange={(e) => setTask(e.target.value)} className='w-[100%] h-11 bg-white border-amber-600 border-2 my-3 rounded-full p-3'
        type="text" placeholder='Write your task' onKeyDown={(e) => e.key === "Enter" && handleadd()} />
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex flex-col md:flex-row gap-2 w-full">

          {/* Priority Section */}
          <div className="flex items-center justify-center pl-3 gap-2 bg-white rounded-full w-full lg:w-auto">
            <label className="text-lg md:text-2xl font-semibold">Priority</label>
            <select
              id="priority"
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="bg-yellow-200 px-2 py-1 h-full text-center rounded-full w-full lg:w-auto"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Activity Section */}
          <div className="flex items-center justify-center pl-3 gap-2 bg-white rounded-full w-full md:w-auto">
            <label className="text-lg md:text-2xl font-semibold">Activity</label>
            <select
              id="activity"
              name="activity"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="bg-yellow-500 px-2 py-1 h-full text-center rounded-full w-full md:w-auto"
            >
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleadd}
          className="bg-violet-700 text-white text-lg md:text-xl font-bold rounded-full w-full md:w-[20%] h-11 m-3"
        >
          Save
        </button>
      </div>

      {/* Show Finished */}
      <div>
        <input type="checkbox" checked={showFinished} onChange={() => dispatch(toggleShowFinished())} name="show finished" id="show" /><span className='mx-2 text-base text-gray-500'>Show finished</span>
      </div>
    </div>
  )
}

export default TaskInput
