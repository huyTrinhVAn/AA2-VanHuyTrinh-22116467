import { useState } from "react";

function Company(props) {
    const { contact, company, companies, setCompanies } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(company.company_name);
    const [editedAddress, setEditedAddress] = useState(company.company_address);

    // Update Company Function
    async function updateCompany(e) {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost/api/contacts/${contact.id}/companies/${company.company_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    company_name: editedName,
                    company_address: editedAddress,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to update company: ${response.status} ${response.statusText}`);
            }

            const updatedCompany = await response.json();

            if (!updatedCompany || !updatedCompany.company_id) {
                throw new Error('Invalid data received from server');
            }

            // Update the company in the state
            const updatedCompanies = companies.map((c) =>
                c.company_id === updatedCompany.company_id ? updatedCompany : c
            );
            setCompanies(updatedCompanies);
            setIsEditing(false);  // Exit editing mode

        } catch (error) {
            console.error('Error updating company:', error);
            alert(`An error occurred while updating the company: ${error.message}`);
        }
    }

    // Delete Company Function
    async function deleteCompany() {
        const response = await fetch(`http://localhost/api/contacts/${contact.id}/companies/${company.company_id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            let newCompanies = companies.filter((c) => c.company_id !== company.company_id);
            setCompanies(newCompanies);
        } else {
            console.error('Error deleting company');
        }
    }

    return (
        <tr>
            {isEditing ? (
                <>
                    <td>
                        <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={editedAddress}
                            onChange={(e) => setEditedAddress(e.target.value)}
                        />
                    </td>
                    <td>
                        <button className="button green" onClick={updateCompany}>Save</button>
                        <button className="button red" onClick={() => setIsEditing(false)}>Cancel</button>
                    </td>
                </>
            ) : (
                <>
                    <td>{company.company_name}</td>
                    <td>{company.company_address}</td>
                    <td>
                        <button className="button green" onClick={() => setIsEditing(true)}>Edit</button>
                        <button className="button red" onClick={deleteCompany}>Delete</button>
                    </td>
                </>
            )}
        </tr>
    );
}

export default Company;
