import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

export const PostContext = createContext();

const initialState = {
  loading: false,
  error: "",
  todos: [],
  addModal: false,
  editModal: false,
  filteredTodos: [],
  groups: [], // Add a groups state to hold the list of groups
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_TODOS":
      return {
        ...state,
        todos: action.payload,
        filteredTodos: action.payload,
      };
    case "SET_FILTERED_TODOS":
      return { ...state, filteredTodos: action.payload };
    case "SET_GROUPS":
      return { ...state, groups: action.payload }; // Add a case for setting groups
    case "TOGGLE_ADD_MODAL":
      return { ...state, addModal: !state.addModal };
    case "TOGGLE_EDIT_MODAL":
      return { ...state, editModal: !state.editModal };
    default:
      return state;
  }
};

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchTodos = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await axios.get("http://localhost:3000/students");
      const todos = res.data;
      const groups = [...new Set(todos.map((todo) => todo.group))]; // Extract unique groups
      dispatch({ type: "SET_TODOS", payload: todos });
      dispatch({ type: "SET_GROUPS", payload: groups }); // Set the groups in state
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const createTodo = async (todo) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await axios.post("http://localhost:3000/students", todo);
      const newTodos = [...state.todos, res.data];
      dispatch({ type: "SET_TODOS", payload: newTodos });
      const groups = [...new Set(newTodos.map((todo) => todo.group))]; // Update groups
      dispatch({ type: "SET_GROUPS", payload: groups });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const deleteTodo = async (id) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await axios.delete(`http://localhost:3000/students/${id}`);
      const newTodos = state.todos.filter((todo) => todo.id !== id);
      dispatch({ type: "SET_TODOS", payload: newTodos });
      const groups = [...new Set(newTodos.map((todo) => todo.group))]; // Update groups
      dispatch({ type: "SET_GROUPS", payload: groups });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const updateTodo = async (todo) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await axios.put(
        `http://localhost:3000/students/${todo.id}`,
        todo
      );
      const newTodos = state.todos.map((item) =>
        item.id === todo.id ? res.data : item
      );
      dispatch({ type: "SET_TODOS", payload: newTodos });
      const groups = [...new Set(newTodos.map((todo) => todo.group))]; // Update groups
      dispatch({ type: "SET_GROUPS", payload: groups });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const searchTodos = (e) => {
    const text = e.target.value;
    const newTodos = state.todos.filter(
      (todo) =>
        todo.firstName.toLowerCase().includes(text.toLowerCase()) ||
        todo.lastName.toLowerCase().includes(text.toLowerCase())
    );
    dispatch({ type: "SET_FILTERED_TODOS", payload: newTodos });
  };

  const filterTodos = (group) => {
    const newTodos = state.todos.filter((todo) =>
      group === "All" ? true : todo.group === group
    );
    dispatch({ type: "SET_FILTERED_TODOS", payload: newTodos });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <PostContext.Provider
      value={{
        state,
        dispatch,
        fetchTodos,
        createTodo,
        deleteTodo,
        updateTodo,
        searchTodos,
        filterTodos, // Include filterTodos in context value
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
