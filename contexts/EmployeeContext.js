import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const EmployeeContext = createContext();
const EmployeeContextProvider = props => {
  const [employees, setEmployees] = useState([
    {
      id: uuidv4(),
      name: "Alan Turing",
      email: "turingalan@mail.com",
      address: "89  Street, New York, USA",
      phone: "(171) 442-3588",
    },
    {
      id: uuidv4(),
      name: "Linus Torvalds",
      email: "linusmicrosoftr@mail.com",
      address: "Durlik Str. 57, Amsterdam, Holland",
      phone: "(200) 510-8995",
    },
    {
      id: uuidv4(),
      name: "Maria Anders",
      email: "mariaanders@mail.com",
      address: "25, rue Lauriston, Paris, France",
      phone: "(503) 555-9931",
    },
    {
      id: uuidv4(),
      name: "Grace Hopper",
      email: "hoppergrace@mail.com",
      address: "Via Monte Bianco 34, Westy, Italy",
      phone: "(120) 300-2200",
    },
    {
      id: uuidv4(),
      name: "Zuht Lokme",
      email: "zuhttt@mail.com",
      address: "Kadikoy, Istanbul, Turkey",
      phone: "(554) 878-9500",
    },
  ]);

  const addEmployee = (name, email, address, phone) => {
    setEmployees([
      ...employees,
      {
        id: uuidv4(),
        name: name,
        email: email,
        address: address,
        phone: phone,
      },
    ]);
  };

  const deleteEmployee = id => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  const updateEmployee = (id, updatedEmployee) => {
    setEmployees(
      employees.map(employee =>
        employee.id === id ? updatedEmployee : employee
      )
    );
  };
  return (
    <EmployeeContext.Provider
      value={{ employees, addEmployee, deleteEmployee, updateEmployee }}
    >
      {/* .Provider value = {} kısmına hem state bilgisini atadık hem de metodlarımızı gönderebiliyoruz*/}
      {props.children}
    </EmployeeContext.Provider>
  );
};
export default EmployeeContextProvider;
