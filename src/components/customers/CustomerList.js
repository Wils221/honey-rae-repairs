import { useEffect, useState } from "react"
import { Customer } from "./Customers"
import "./Customers.css"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    //fetch customers from API
    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=false`)
            .then(response => response.json())
            .then((customerArray)=> {
                setCustomers(customerArray)
            })
        },
        []
    )
    //iterate over array of customers in JSX to display the name of each customer by passing each object to the Customer component as a prop
    return <article className="customers">
        {customers.map(customer => <Customer key={`customer--${customer.id}`}
        id={customer.id} //prop that is being passed to child element (customer)
        fullName={customer.fullName}/>) //prop that is being passed to child element (customer)
        }
    </article>
}