//This module controls what view the user sees based on what type of user they are (customer vs staff)

import { CustomerViews } from "./CustomerViews"
import { EmployeeViews } from "./EmployeeViews"

export const ApplicationViews = () => {

	const localHoneyUser = localStorage.getItem("honey_user") //get honeyUser object out of local storage, return as a string
    const honeyUserObject = JSON.parse(localHoneyUser) //makes variable above an object so we can use it. this is an oject with two properties: id and staff
    
    if (honeyUserObject.staff) {
        //return employee view
        return <EmployeeViews />
    } else {
        //return customer view
        return <CustomerViews />
    }
}