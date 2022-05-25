const DB_URL = process.env.DATABASE_URL || "postgres://brcmzehywseomq:358b493b7e8c5ac3f9d21ea32b29422330a9ed5360e2ba9cd4e0159534b1974e@ec2-99-80-170-190.eu-west-1.compute.amazonaws.com:5432/d5rpnaa9n7inj6";

const DB_CONFIG = {
    uri: DB_URL,
    tableNotes: "notes",
}

module.exports = DB_CONFIG;
