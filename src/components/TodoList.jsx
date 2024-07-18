import { useState, useContext } from "react";
import ReactPaginate from "react-paginate";
import TodoCard from "./TodoCard";
import EditTodo from "./EditTodo";
import { PostContext } from "../Contexts/MainContext";

const TodoList = () => {
  const { state, dispatch, deleteTodo, updateTodo } = useContext(PostContext);
  const [todoEditing, setTodoEditing] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const todosPerPage = 5;

  const handleDelete = (id) => {
    if (confirm("Ochirishni xohlaysizmi?")) {
      deleteTodo(id);
    }
  };

  const handleEdit = (todo) => {
    dispatch({ type: "TOGGLE_EDIT_MODAL", payload: true });
    setTodoEditing(todo);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * todosPerPage;
  const currentTodos = state.filteredTodos.slice(offset, offset + todosPerPage);
  const pageCount = Math.ceil(state.filteredTodos.length / todosPerPage);

  return (
    <>
      {state.editModal && (
        <EditTodo
          editModal={state.editModal}
          handleClose={() =>
            dispatch({ type: "TOGGLE_EDIT_MODAL", payload: false })
          }
          updateTodo={updateTodo}
          todos={state.todos}
          todoEditing={todoEditing}
        />
      )}

      <div className="d-flex flex-wrap justify-content-center">
        {currentTodos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>

      <nav
        aria-label="Page navigation"
        className="d-flex justify-content-center mt-4"
      >
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          // pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
          activeLinkClassName={"page-link"}
        />
      </nav>
    </>
  );
};

export default TodoList;
