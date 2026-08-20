import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.js';

interface SessionAttributes {
    id: number;
    name: string;
    status: string;
}

interface SessionCreationAttributes extends Optional<SessionAttributes, 'id' | "status"> {}

class Session extends Model<SessionAttributes, SessionCreationAttributes> implements SessionAttributes {
    declare id: number;
    declare name: string;
    declare status: string;
}

Session.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'ACTIVE'
        }
    },
    {
        sequelize,
        tableName: 'sessions',
        timestamps: false
    }
);

export default Session;