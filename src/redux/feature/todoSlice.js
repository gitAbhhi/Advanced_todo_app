import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";


// Fetch Weather Information
export const fetchWeather = createAsyncThunk(
  "todos/fetchWeather",
  async (city, thunkAPI) => {
    try {
      const API_KEY = "ca6556d2d9e9dbb71256d2dc2b97d4bf";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      return {
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Error fetching weather");
    }
  }
);

//Initial State
const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
  showFinished: true,
  weather: null,
  weatherLoading: false,
  weatherError: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {

    addTodo: (state, action) => {
      state.todos.push(action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },

    editTodo: (state, action) => {
      state.todos = state.todos.map(todo =>
        todo.id === action.payload.id ? { ...todo, task: action.payload.task } : todo
      );
      localStorage.setItem("todos", JSON.stringify(state.todos)); 
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    toggleTodo: (state, action) => {
      state.todos = state.todos.map(todo =>
        todo.id === action.payload ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    toggleShowFinished: (state) => {
      state.showFinished = !state.showFinished;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.weatherLoading = true;
        state.weatherError = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weatherLoading = false;
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.weatherLoading = false;
        state.weatherError = action.payload;
      });
  },

})
export const { addTodo, editTodo, deleteTodo, toggleTodo, toggleShowFinished } = todoSlice.actions;
export default todoSlice.reducer;