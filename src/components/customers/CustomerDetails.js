//this will be displayed when route matches "customers/:customersId". Lists details on chosen employee
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export const CustomerDetails = () => {
    const {customerId} = useParams()
    const [customer, updateCustomer] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleCustomer = data[0]
                    updateCustomer(singleCustomer)
                })
        },
        [customerId]
    ) 

     //now that we have all the state we need we can build JSX below:
    //optional chaining ?.  "only keep going down this path if the properties exist" - needed if properties are nested
    return <section className="customer">
        <header className="customer_header">{customer?.user?.fullName}</header>
        <div>Email: {customer?.user?.email}</div>
        <div>Phone Number: {customer.phoneNumber}</div>
        <div>Address: {customer.address}</div>
        </section>
}











