

//Exports to Customer List to get all customers with user info
export const getAllCustomers = () => {
    return fetch(`http://localhost:8088/customers?_expand=user`)
        .then(res => res.json())
}

//Exports to Customer Details to get single customer
export const getSingleCustomer = (customerId, updateCustomer) => {
    return fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
    .then(res => res.json())
        .then(data => updateCustomer(data[0]))
}


//Exports to employee details to fetch single employee
export const getSingleEmployee = (employeeId, updateEmployee) => {
    return fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
    .then(res => res.json())
        .then(data => updateEmployee(data[0]))
}

//Exports to Employee List to get all employees
export const getAllEmployees = () => {
    return fetch(`http://localhost:8088/users?isStaff=true`)
        .then(res => res.json())
}

//Exports to Customer Form to get current customer by user Id
export const getCurrentCustomer = (honeyUserObject, setProfile) => {
    fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
    .then(response => response.json())
        .then(dataFromCustomersArrayForCurrentUser => setProfile(dataFromCustomersArrayForCurrentUser[0]))
}

//Exports to Customer Form. PUT to update profile
export const saveCustomerUpdates = (profile) => {
    return fetch(`http://localhost:8088/customers/${profile.id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(profile)
})
.then(response => response.json())}

//Exports to Employee Form to get current employee by user Id
export const getCurrentEmployee = (honeyUserObject, setProfile) => {
    fetch(`http://localhost:8088/employees?userId=${honeyUserObject.id}`)
    .then(response => response.json())
        .then(dataFromEmployeesArrayForCurrentUser => setProfile(dataFromEmployeesArrayForCurrentUser[0]))
}

//Exports to Employee Form. PUT to update profile
export const saveEmployeeUpdates = (profile) => {
    return fetch(`http://localhost:8088/employees/${profile.id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(profile)
})
.then(response => response.json())}