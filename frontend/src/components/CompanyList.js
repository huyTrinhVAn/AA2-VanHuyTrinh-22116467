import { useState, useEffect } from "react";
import NewCompany from "./NewCompany";
import Company from "./Company";

function CompanyList(props) {
    const { contact, companies, setCompanies } = props;
    useEffect(() => {
        // Fetch companies for the contact when the component mounts
        fetch(`http://localhost/api/contacts/${contact.id}/companies`)
            .then(response => response.json())
            .then(data => setCompanies(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [contact.id, setCompanies]);

    return (
        <div className="phone-list">
            <h2>Companies for {contact.name}</h2>
            <NewCompany contact={contact} companies={companies} setCompanies={setCompanies} />
            <table onClick={(e) => e.stopPropagation()}>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Company Address</th>
                        <th>Modification</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        companies.map((company) => {
                            return (
                                <Company key={company.company_id} company={company} companies={companies} setCompanies={setCompanies} contact={contact} />
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}
export default CompanyList;