import React from "react";
import { EmployeeContext } from "../contexts/EmployeeContext";
import { useContext, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import EditForm from "./EditForm";
const Employee = ({ employee }) => {
  const { deleteEmployee } = useContext(EmployeeContext);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    handleClose();
  }, [employee]);

  return (
    <>
      {/*normalde employee,index yapıyorduk ama verilerimiz kendi id'si oldugu için
          key değerine employee.id verebiliriz daha sağlıklı olur */}
      <td>{employee.name}</td>
      <td>{employee.email}</td>
      <td>{employee.address}</td>
      <td>{employee.phone}</td>
      <td>
        <button
          onClick={handleShow}
          className="btn btn-warning"
          data-toggle="modal"
        >
          <i className="material-icons" data-toggle="tooltip" title="Edit">
            &#xE254;
          </i>
        </button>
        <button
          onClick={() => {
            deleteEmployee(employee.id);
          }}
          className="btn btn-danger"
          data-toggle="modal"
        >
          <i className="material-icons" data-toggle="tooltip" title="Delete">
            &#xE872;
          </i>
        </button>
      </td>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>Employee Editing </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditForm theEmployee={employee} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Modal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Employee;
