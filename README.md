# PatientCare API

## Project Overview
The project is a REST API built using Node.js and Express.js, designed to manage patient records in a medical setting. It allows for the creation, retrieval, updating, and deletion of patient information, medical records, and prescriptions.

## Key Components and Logic

### Express Setup
- **Express Framework**: Used to set up the server and handle routing.
- **Body-Parser Middleware**: Used to parse incoming JSON requests.

### In-Memory Database
- **Patients**: An object storing patient details indexed by their date of birth (DOB).
- **Records**: An object storing medical records and prescriptions indexed by patient DOB.

### Middleware
- **validatePatientRequest**: Ensures that the necessary headers (DOB, first name, and last name) are provided in requests. If any required fields are missing, it sends a 400 Bad Request response.

### Endpoints
- **Get Patient Medical Records (`GET /patients/records`)**: Retrieves the medical records for a patient. Validates that the patient exists and that the provided first name and last name match the DOB.
- **Get Detailed Patient Information (`GET /patients/details`)**: Retrieves comprehensive details about a patient, including their insurance status and prescriptions. Performs the same validations as the medical records endpoint.
- **Create a New Patient (`POST /patients`)**: Adds a new patient to the database. Validates that all necessary fields are provided and that the patient does not already exist.
- **Update Patient Phone Number (`PUT /patients/phone`)**: Updates the phone number for an existing patient. Validates the patient's existence and that the provided first name and last name match the DOB.
- **Update Insurance Validity (`PUT /patients/insurance`)**: Updates the insurance validity status for a patient. Validates that the patient exists and that the provided first name and last name match the DOB.
- **Update Prescription Fill/Refill Status (`PUT /patients/prescriptions`)**: Updates the fill status and refill count of a specific prescription for a patient. Validates the patient's existence, the prescription's existence, and that the provided first name and last name match the DOB.
- **Delete Patient and Their Records (`DELETE /patients`)**: Deletes a patient and their associated medical records from the database. Validates the patient's existence and that the provided first name and last name match the DOB.

### Error Handling
- **400 Bad Request**: Returned when required fields are missing from the request.
- **401 Unauthorized**: Returned when the provided first name and last name do not match the DOB.
- **404 Not Found**: Returned when a patient, medical record, or prescription does not exist.
- **409 Conflict**: Returned when attempting to create a patient that already exists.

### Example Data Structures

#### Patients Object
```javascript
{
    "2000-01-01": { firstName: "Ichigo", lastName: "Kurosaki", phone: "506-787-7171", insuranceValid: true },
    "1995-05-05": { firstName: "Satoru", lastName: "Gojo", phone: "506-282-0001", insuranceValid: false }
}
```
#### Records Object
```javascript
{
    "2000-01-01": {
        status: "Healthy",
        prescriptions: [
            { id: 1, name: "Medicine A", validTill: "2024-12-31", fillStatus: "Filled", refills: 2 },
            { id: 2, name: "Medicine B", validTill: "2023-06-30", fillStatus: "Not Filled", refills: 0 }
        ]
    },
    "1995-05-05": {
        status: "Sick",
        prescriptions: [
            { id: 1, name: "Medicine C", validTill: "2023-09-30", fillStatus: "Filled", refills: 1 }
        ]
    }
}
```

## Execution Flow
**1. Request Handling:** When a request is made, the server uses the defined routes to determine which endpoint should handle the request.
**2. Validation:** Middleware and endpoint-specific checks ensure that all required data is provided and correct.
**3. Data Manipulation:** Based on the request type (GET, POST, PUT, DELETE), the server either retrieves, adds, updates, or deletes data from the in-memory database.
**4. Response:** The server sends an appropriate response, including status codes and any requested data or error messages.

This setup provides a clear and organized way to manage patient data, ensuring that only valid requests are processed and that detailed information about patients can be efficiently retrieved and updated.

## Demonstration
I am using **Postman** for testing the API endpoints. Demonstration clips will be added for better understanding.

## License
This project is licensed under the MIT License. See the [MIT License.txt](https://github.com/user-attachments/files/15932345/MIT.License.txt) file for details.MIT License
