import React, { useEffect, useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { PostContext } from "../Contexts/MainContext";

const EditTodo = ({ editModal, handleClose, todoEditing }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [group, setGroup] = useState("");
  const { dispatch, updateTodo } = useContext(PostContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodo({
      id: todoEditing.id,
      firstName,
      lastName,
      group,
    });
    handleClose;
    dispatch({ type: "TOGGLE_EDIT_MODAL", payload: false });
  };

  useEffect(() => {
    if (todoEditing) {
      setFirstName(todoEditing.firstName);
      setLastName(todoEditing.lastName);
      setGroup(todoEditing.group);
    }
  }, [todoEditing]);

  return (
    <Modal show={editModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit the todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              Firstname
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Firstname"
              className="form-control mb-2"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName" className="form-label">
              Lastname
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Lastname"
              className="form-control mb-2"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="group" className="form-label">
              Group
            </label>
            <input
              type="text"
              id="group"
              placeholder="Group"
              className="form-control mb-2"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="dark" onClick={handleSubmit} type="submit">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTodo;
