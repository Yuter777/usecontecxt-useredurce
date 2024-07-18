import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import TodoList from "./TodoList";
import Loader from "./Loader";
import Error from "./Error";
import AddTodo from "./AddTodo";
import { PostContext } from "../Contexts/MainContext";

function Todos() {
  const { state, dispatch, searchTodos, filterTodos } = useContext(PostContext);
  const [filter, setFilter] = useState("All"); // Add filter state

  // Handle filter changes
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    filterTodos(event.target.value); // Call the filter function from context
  };

  // Handle search input
  const handleSearchChange = (event) => {
    searchTodos(event);
    filterTodos(filter); // Call the filter function after search
  };

  return (
    <div>
      <h1 className="text-center">Students {state.todos.length}</h1>
      <div className="d-flex justify-content-between align-content-center pb-5 container">
        <input
          type="text"
          className="form-control"
          placeholder="Ism va Familiya orqali qidiring!!!"
          onChange={handleSearchChange}
          style={{ width: "360px" }}
        />

        <select
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          className="form-select"
          style={{ width: "200px" }}
        >
          <option value="All">All</option>
          {state.groups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>

        <button
          onClick={() => dispatch({ type: "TOGGLE_ADD_MODAL", payload: true })}
          className="btn btn-dark d-flex gap-2 align-items-center"
        >
          <FaPlus />
          <span>Add</span>
        </button>
      </div>

      {state.addModal && (
        <AddTodo
          addModal={state.addModal}
          handleClose={() => dispatch({ type: "TOGGLE_ADD_MODAL" })}
          todos={state.todos}
        />
      )}

      {state.error && <Error error={state.error} />}

      {state.loading && <Loader />}

      {state.filteredTodos.length > 0 && <TodoList />}
    </div>
  );
}

export default Todos;
