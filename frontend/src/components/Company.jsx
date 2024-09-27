function Company(props) {
    const { contact, company, companies, setCompanies } = props;

    async function deleteCompany() {
        const response = await fetch(`http://localhost/api/contacts/${contact.id}/companies/${company.company_id}`, {
            method: 'DELETE'
        });
        let newCompanies = companies.filter((c) => c.company_id !== company.company_id);
        setCompanies(newCompanies);
    }
    return (
        <tr>
            <td>{company.company_name}</td>
            <td>{company.company_address}</td>
            <td>
                <button className="button red" onClick={deleteCompany}>Delete</button>
            </td>
        </tr>
    )
}
export default Company;