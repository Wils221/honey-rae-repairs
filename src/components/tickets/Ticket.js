import { Link } from "react-router-dom"

export const Ticket = ( {ticketObject, currentUser, employees, getAllTickets } ) =>
{

//Find the assigned employee for the current ticket
    let assignedEmployee = null
    if (ticketObject.employeeTickets.length > 0) {
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }

//Find the employee profile object for the current user
    const userEmployee = employees.find(employee => employee.userId === currentUser.id)

    //ToDo: Function that determines if the current user can close the ticket
    const canClose = () => {
        if(userEmployee?.id === assignedEmployee?.id && ticketObject.dateCompleted === "") {
            return <button onClick={(closeTicket)} className="ticket_finish">Finish</button>
        }
        else {
            return ""
        }
    }

    //ToDo: Function that determines if the current user can delete the ticket
    const deleteButton = () => {
        if(!currentUser.staff) {
            return <button onClick={() => {
            fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
            method: "DELETE",
        })
            .then(() => {
                getAllTickets()
            }) 
        }} className="ticket_delete">Delete</button>
        }
        else {
            return ""
        }

    }

    // TODO: Function that updates the ticket with a new date completed
    const closeTicket = () => {
        const copy = {
            userId: ticketObject.userId,
            description: ticketObject.description,
            emergency: ticketObject.emergency,
            dateCompleted: new Date()
        }

        return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
            .then(response => response.json())
            .then(getAllTickets)
    }

    const buttonOrNoButton = () => {
        if (currentUser.staff) {
           return <button
                    onClick={() => {
                        fetch(`http://localhost:8088/employeeTickets`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                employeeId: userEmployee.id,
                                serviceTicketId: ticketObject.id
                            })
                        })
                        .then(response => response.json())
                        .then(() => {
                            //Get State from API again
                            getAllTickets()
                        })
                    }}
                    >Claim</button>
        }
        else {
            return ""
        }
    }

    return <div className="ticket" key={`ticket--${ticketObject.id}`}>
        <header className="ticket--header">
            {
                currentUser.staff
                ? `Ticket ${ticketObject.id}`
                :<Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
            }
        </header>
        <section>{ticketObject.description}</section>
        <section>Emergency: {ticketObject.emergency ? "🧨" : "No"}</section>
        <footer className="ticket_footer">
            {
                ticketObject.employeeTickets.length
                ? `Currently being worked on by ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                : buttonOrNoButton()
            }
            {
                currentUser.staff
                ? canClose()
                : ""
            }
            {
                deleteButton()
            }
        </footer>
        </div>
}