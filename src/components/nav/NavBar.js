import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {
    const localHoneyUser = localStorage.getItem("honey_user") //get honeyUser object out of local storage, return as a string
    const honeyUserObject = JSON.parse(localHoneyUser) //makes variable above an object so we can use it. this is an oject with two properties: id and staff
    
    if (honeyUserObject.staff) {
        //return employee view
        return <EmployeeNav />
    } else {
        //return customer view
        return <CustomerNav />
    }
}