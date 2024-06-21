const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// In-memory database for patients and records
let patients = {
    "2000-01-01": { firstName: "Mohammed Kashif", lastName: "Ahmed", phone: "506-787-7171", insuranceValid: true },
    "1995-05-05": { firstName: "Spartans", lastName: "Taj Hydrabad", phone: "506-282-0001", insuranceValid: false }
};

let records = {
    "2000-01-01": {
        status: "Healthy",
        prescriptions: [
            { id: 123456, name: "Medicine A", validTill: "2024-12-31", fillStatus: "Filled", refills: 2 },
            { id: 223311, name: "Medicine B", validTill: "2023-06-30", fillStatus: "Not Filled", refills: 0 }
        ]
    },
    "1995-05-05": {
        status: "Sick",
        prescriptions: [
            { id: 213213, name: "Medicine C", validTill: "2023-09-30", fillStatus: "Filled", refills: 1 }
        ]
    }
};

// Middleware to validate DOB, firstName, and lastName
const validatePatientRequest = (req, res, next) => {
    const { dob, firstname, lastname } = req.headers;
    if (!dob || !firstname || !lastname) {
        return res.status(400).json({ error: "DOB, firstname, and lastname are required" });
    }
    next();
};

// Get patient medical records
app.get("/patients/records", validatePatientRequest, (req, res) => {
    const { dob, firstname, lastname } = req.headers;
    
    if (!patients[dob]) {
        return res.status(404).json({ error: "Patient not found" });
    }
    if (patients[dob].firstName !== firstname || patients[dob].lastName !== lastname) {
        return res.status(401).json({ error: "First or last name did not match the DOB" });
    }
    
    const record = records[dob];
    if (!record) {
        return res.status(404).json({ error: "Medical record not found" });
    }

    res.status(200).json(record);
});

// Get detailed patient information
app.get("/patients/details", validatePatientRequest, (req, res) => {
    const { dob, firstname, lastname } = req.headers;
    
    if (!patients[dob]) {
        return res.status(404).json({ error: "Patient not found" });
    }
    if (patients[dob].firstName !== firstname || patients[dob].lastName !== lastname) {
        return res.status(401).json({ error: "First or last name did not match the DOB" });
    }
    
    const record = records[dob];
    if (!record) {
        return res.status(404).json({ error: "Medical record not found" });
    }

    const patientDetails = {
        ...patients[dob],
        ...record
    };

    res.status(200).json(patientDetails);
});

// Create a new patient
app.post("/patients", (req, res) => {
    const { dob, firstname, lastname, phone, insuranceValid } = req.body;
    if (!dob || !firstname || !lastname || !phone || insuranceValid === undefined) {
        return res.status(400).json({ error: "DOB, firstname, lastname, phone, and insurance validity are required" });
    }
    if (patients[dob]) {
        return res.status(409).json({ error: "Patient with this DOB already exists" });
    }

    patients[dob] = { firstName: firstname, lastName: lastname, phone, insuranceValid: insuranceValid };
    res.status(201).json(patients[dob]);
});

// Update existing patient's phone number
app.put("/patients/phone", validatePatientRequest, (req, res) => {
    const { dob, firstname, lastname } = req.headers;
    const { phone } = req.body;

    if (!phone) {
        return res.status(400).json({ error: "Phone number is required" });
    }
    if (!patients[dob]) {
        return res.status(404).json({ error: "Patient not found" });
    }
    if (patients[dob].firstName !== firstname || patients[dob].lastName !== lastname) {
        return res.status(401).json({ error: "First or last name did not match the DOB" });
    }

    patients[dob].phone = phone;
    res.status(200).json(patients[dob]);
});

// Update insurance validity
app.put("/patients/insurance", validatePatientRequest, (req, res) => {
    const { dob, firstname, lastname } = req.headers;
    const { insuranceValid } = req.body;

    if (insuranceValid === undefined) {
        return res.status(400).json({ error: "Insurance validity status is required" });
    }
    if (!patients[dob]) {
        return res.status(404).json({ error: "Patient not found" });
    }
    if (patients[dob].firstName !== firstname || patients[dob].lastName !== lastname) {
        return res.status(401).json({ error: "First or last name did not match the DOB" });
    }

    patients[dob].insuranceValid = insuranceValid;
    res.status(200).json(patients[dob]);
});

// Update prescription fill/refill status
app.put("/patients/prescriptions", validatePatientRequest, (req, res) => {
    const { dob, firstname, lastname } = req.headers;
    const { prescriptionId, fillStatus, refills } = req.body;

    if (prescriptionId === undefined || fillStatus === undefined || refills === undefined) {
        return res.status(400).json({ error: "Prescription ID, fill status, and refills are required" });
    }
    if (!patients[dob]) {
        return res.status(404).json({ error: "Patient not found" });
    }
    if (patients[dob].firstName !== firstname || patients[dob].lastName !== lastname) {
        return res.status(401).json({ error: "First or last name did not match the DOB" });
    }

    const record = records[dob];
    if (!record) {
        return res.status(404).json({ error: "Medical record not found" });
    }

    const prescription = record.prescriptions.find(p => p.id === prescriptionId);
    if (!prescription) {
        return res.status(404).json({ error: "Prescription not found" });
    }

    prescription.fillStatus = fillStatus;
    prescription.refills = refills;

    res.status(200).json(prescription);
});

// Delete existing patient and their records
app.delete("/patients", validatePatientRequest, (req, res) => {
    const { dob, firstname, lastname } = req.headers;

    if (!patients[dob]) {
        return res.status(404).json({ error: "Patient not found" });
    }
    if (patients[dob].firstName !== firstname || patients[dob].lastName !== lastname) {
        return res.status(401).json({ error: "First or last name did not match the DOB" });
    }

    delete patients[dob];
    delete records[dob];

    res.status(200).json({ message: "Patient and medical records deleted successfully" });
});

app.listen(2004, () => {
    console.log("Server running on port 2004");
});
