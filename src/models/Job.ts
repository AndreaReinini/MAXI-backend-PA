import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import { JOB_STATUSES, type JobStatus } from "../types/jobStatus.js";

// Definizione del modello Job
class Job extends Model {
    declare id: number;
    declare sessionId: number;
    declare status: JobStatus;
    declare result: object | null;
}

Job.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        sessionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "sessions", // Nome della tabella a cui fa riferimento
                key: "id", // Colonna della tabella di riferimento
            },
            onUpdate: "CASCADE", // Aggiorna automaticamente se la sessione viene aggiornata
            onDelete: "CASCADE", // Elimina automaticamente se la sessione viene eliminata
        },
        status: {
            type: DataTypes.ENUM(...JOB_STATUSES),
            allowNull: false,
            defaultValue: "PENDING",
        },
        result: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "jobs",
        timestamps: false
    }
);

export default Job;