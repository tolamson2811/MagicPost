const Sequelize = require("sequelize");
const sequelize = require("../../utils/database");

const Customers = require("./customers");

const Accounts = sequelize.define(
    "Accounts",
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        role: {
            type: Sequelize.ENUM,
            values: [
                "Manager",
                "Aggregation Lead",
                "Transaction Lead",
                "Aggregation Employee",
                "Transaction Employee",
                "Customer",
            ],
            allowNull: false,
            defaultValue: "Customer",
        },
    },
    {
        hooks: {
            afterCreate: (account, options) => {
                if (account.role === "Customer") {
                    const customer = new Customers({
                        account_id: account.id,
                    });
                    customer.save();
                }
            },
        },
    }
);

module.exports = Accounts;
