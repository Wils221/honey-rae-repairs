//this will be displayed when route matches "employees/:employeesId". Lists details on chosen employee
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export const EmployeeDetails = () => {
    const {employeeId} = useParams() //useparams hook captures the employeeId and deconstructs it (state we're getting from the route)
    const [employee, updateEmployee] = useState({}) //state variable for the employee


    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`) //filters through all employees and returns only ones that meet theses conditions
            .then(response => response.json())
            .then((data) => {
                const singleEmployee = data[0]
                updateEmployee(singleEmployee)
            })
        },
        [employeeId]
    )

    //now that we have all the state we need we can build JSX below:
    //optional chaining ?.  "only keep going down this path if the properties exist"
    return <section className="employee">
        <header className="employee_header">{employee?.user?.fullName}</header>
        <div>Email: {employee?.user?.email}</div>
        <div>Specialty: {employee.specialty}</div>
        <div>Rate: {employee.rate}</div>
        <footer className="employee_footer">Currently working on {employee?.employeeTickets?.length} tickets</footer>
        </section>
}




// http://localhost:8088/employees =>  pulls the employees table 
// _expand=user => pulls and adds matching user key and adds that information to each employee. Adds fullName and email info we want
// &embed=employeeTickets => pulls and adds matching employee tickets key. Shows what ticket employee is currently working on (it is an array)
// &userId=${employeeId} => filters and returns only employee we've clicked on 