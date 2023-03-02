import { useState, useEffect } from "react"
import { Employee } from "./Employee"
import "./Employees.css"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    //fetch employees from API
    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=true`)
            .then(response => response.json())
            .then((employeeArray)=> {
                setEmployees(employeeArray)
            })
        },
        []
    )
    return <article className="employees">
        {employees.map(employee => <Employee key={`employee--${employee.id}`}
        id={employee.id} 
        fullName={employee.fullName} 
        email={employee.email} />)}
    </article>
}


//Query String parameter: everything after the question mark is additional parameters in the request to the server.
// Puts condition on the request. In this case it will only return users who are staff