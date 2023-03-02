//destructuring the customer property

import { Link } from "react-router-dom"

//Component for displaying customers, child of CustomerList
export const Customer = ({id, fullName}) => {
    return <section className="customer">
    <div>
        <Link to={`/customers/${id}`}>Name: {fullName}</Link>
    </div>
    </section>
}