import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TodoCard = ({ todo, handleEdit, handleDelete }) => {
  return (
    <div className="card m-2">
      <div className="card-body">
        <h5 className="card-title">
          {todo.firstName} {todo.lastName}
        </h5>
        <p className="card-text">Group: {todo.group}</p>
        <div className="d-flex gap-2">
          <button
            onClick={() => handleEdit(todo)}
            className="btn btn-sm btn-success d-flex gap-2 align-items-center"
          >
            <FaEdit />
            <span>Edit</span>
          </button>
          <button
            onClick={() => handleDelete(todo.id)}
            className="btn btn-sm btn-danger d-flex gap-2 align-items-center"
          >
            <MdDelete />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
