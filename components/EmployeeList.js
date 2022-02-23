import Employee from "./Employee";
import { useContext, useState, useEffect } from "react";
import { EmployeeContext } from "../contexts/EmployeeContext";
import { Button, Modal, Alert } from "react-bootstrap";
import AddForm from "./AddForm";
import Pagination from "./Pagination";

const EmployeeList = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const { employees } = useContext(EmployeeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);

  useEffect(() => {
    handleClose();
    return () => {
      handleShowAlert();
    };
  }, [employees]);
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const totalPagesNum = Math.ceil(employees.length / employeesPerPage);

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              Manage <b>Employees</b>
            </h2>
          </div>
          <div className="col-sm-6">
            <Button
              onClick={handleShow}
              className="btn btn-success text-white"
              data-toggle="modal"
            >
              <i className="material-icons">&#xE147;</i>{" "}
              <span>Add New Employee</span>
            </Button>
          </div>
        </div>
      </div>
      <Alert variant="success" show={showAlert}>
        Employee List successfully updated!
      </Alert>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {employees.map(employee => (
            <tr key={employee.id}>
              <Employee employee={employee} />
            </tr>
          ))} */}
          {/*.sort((a, b) => (a.name < b.name ? -1 : 1) ekledigimiz elemanları sıralar  */}
          {employees
            .sort((a, b) => (a.name < b.name ? -1 : 1))
            .map(employee => (
              <tr key={employee.id}>
                <Employee employee={employee} />
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination
        pages={totalPagesNum}
        setCurrentPage={setCurrentPage}
        currentEmployees={currentEmployees}
        sortedEmployees={employees}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>Employee Adding</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddForm />
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
export default EmployeeList;
