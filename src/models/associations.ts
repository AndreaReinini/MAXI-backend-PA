import Session from "./Session.js";
import Job from "./Job.js";

Session.hasMany(Job, { foreignKey: "sessionId", as: "jobs" });
Job.belongsTo(Session, { foreignKey: "sessionId", as: "session" });