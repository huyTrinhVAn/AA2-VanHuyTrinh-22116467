import { useState, useEffect } from 'react';  // import useEffect
import PhoneList from './PhoneList.js';
import CompanyList from './CompanyList.jsx';

function Contact(props) {
    const { contact, contacts, setContacts } = props;
    const [expanded, setExpanded] = useState(false);
    const [phones, setPhones] = useState([]);
    const [companies, setCompanies] = useState([]); // State for companies
    useEffect(() => {
        fetch('http://localhost/api/contacts/' + contact.id + '/phones')
            .then(response => response.json())
            .then(data => setPhones(data))
            .catch((error) => {
                console.error('Error:', error);
            });
        fetch('http://localhost/api/contacts/' + contact.id + '/companies')
            .then(response => response.json())
            .then(data => setCompanies(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const expandStyle = {
        display: expanded ? 'block' : 'none'
    };

    async function doDelete(e) {
        e.stopPropagation();

        const response = await fetch('http://localhost/api/contacts/' + contact.id, {
            method: 'DELETE',
        });

        let newContacts = contacts.filter((c) => {
            return c.id !== contact.id;
        });

        setContacts(newContacts);
    }



    return (
        <div key={contact.id} className='contact' onClick={(e) => setExpanded(!expanded)}>
            <div className='title'>
                {/* Hiển thị name và address trên các dòng riêng biệt */}
                <div>
                    <h3>Name: {contact.name}</h3>
                </div>
                <div>
                    <h3>Address: {contact.address}</h3>
                </div>
                <button className='button red' onClick={doDelete}>Delete Contact</button>
            </div>
            <div style={expandStyle}>
                <hr />
                <PhoneList phones={phones} setPhones={setPhones} contact={contact} />
                <CompanyList companies={companies} setCompanies={setCompanies} contact={contact} /> {/* Add CompanyList here */}
            </div>
        </div>
    );
}
export default Contact;
