module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("company", {
        company_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        company_name: {
            type: Sequelize.STRING,

        },
        company_address: {
            type: Sequelize.STRING,
        },
        contact_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'contacts', // Name of the target table (must be 'contacts' in DB)
                key: 'id', // Foreign key referring to contact id
            }
        }
    });

    return Company;
};
