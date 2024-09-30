import { useState } from "react";

function Phone(props) {
    const { contact, phone, phones, setPhones } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [editedType, setEditedType] = useState(phone.phone_type);
    const [editedNumber, setEditedNumber] = useState(phone.phone_number);

    // Update Phone Function
    async function updatePhone(e) {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost/api/contacts/${contact.id}/phones/${phone.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone_type: editedType,
                    phone_number: editedNumber,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to update phone: ${response.status} ${response.statusText}`);
            }

            const updatedPhone = await response.json();

            if (!updatedPhone || !updatedPhone.id) {
                throw new Error('Invalid data received from server');
            }

            // Update the phone in the state
            const updatedPhones = phones.map((p) =>
                p.id === updatedPhone.id ? updatedPhone : p
            );
            setPhones(updatedPhones);
            setIsEditing(false); // Exit editing mode

        } catch (error) {
            console.error('Error updating phone:', error);
            alert(`An error occurred while updating the phone: ${error.message}`);
        }
    }

    // Delete Phone Function
    async function deletePhone() {
        const response = await fetch(`http://localhost/api/contacts/${contact.id}/phones/${phone.id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            let newPhones = phones.filter((p) => p.id !== phone.id);
            setPhones(newPhones);
        } else {
            console.error('Error deleting phone');
        }
    }

    return (
        <tr>
            {isEditing ? (
                <>
                    <td>
                        <input
                            type="text"
                            value={editedType}
                            onChange={(e) => setEditedType(e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={editedNumber}
                            onChange={(e) => setEditedNumber(e.target.value)}
                        />
                    </td>
                    <td>
                        <button className="button green" onClick={updatePhone}>Save</button>
                        <button className="button red" onClick={() => setIsEditing(false)}>Cancel</button>
                    </td>
                </>
            ) : (
                <>
                    <td>{phone.phone_type}</td>
                    <td>{phone.phone_number}</td>
                    <td>
                        <button className="button green" onClick={() => setIsEditing(true)}>Edit</button>
                        <button className="button red" onClick={deletePhone}>Delete</button>
                    </td>
                </>
            )}
        </tr>
    );
}

export default Phone;
