const { STRING, BIGINT } = require("sequelize");
const sequelize = require("../database/connections");

const Uploads = sequelize.define("uploads", {

    file_name: {
        type: STRING,
        allowNull: false,
    },
    file_size: {
        type: BIGINT,
        allowNull: false,
    }
})

module.exports = Uploads;