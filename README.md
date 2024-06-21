# PatientCare API

PatientCare API is a comprehensive RESTful API built using Node.js and Express.js. It is designed to manage patient records in a medical setting, including the creation, retrieval, updating, and deletion of patient information, medical records, prescriptions, and insurance validity.

## Features

- **Patient Management**: Create, retrieve, update, and delete patient information.
- **Medical Records**: Manage patient medical records, including their status and detailed medical history.
- **Prescriptions**: Handle patient prescriptions, including prescription validity, fill/refill status, and refill count.
- **Insurance**: Track patient insurance validity.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/M-K4SH1F/PatientCare-API.git
    cd PatientCare-API
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

## Usage

1. **Start the server**:
    ```bash
    node index.js
    ```
    Or, if you prefer using `nodemon` for automatic restarts:
    ```bash
    nodemon index.js
    ```

2. **API Endpoints**:

    - **Get Patient Medical Records**:
        ```bash
        GET /patients/records
        Headers:
          dob: <date-of-birth>
          firstname: <first-name>
          lastname: <last-name>
        ```

    - **Get Detailed Patient Information**:
        ```bash
        GET /patients/details
        Headers:
          dob: <date-of-birth>
          firstname: <first-name>
          lastname: <last-name>
        ```

    - **Create a New Patient**:
        ```bash
        POST /patients
        Headers:
          dob: <date-of-birth>
          firstname: <first-name>
          lastname: <last-name>
          phone: <phone-number>
          insuranceValid: <true/false>
        ```

    - **Update Patient Phone Number**:
        ```bash
        PUT /patients/phone
        Headers:
          dob: <date-of-birth>
          firstname: <first-name>
          lastname: <last-name>
        Body (JSON):
          {
            "phone": "<new-phone-number>"
          }
        ```

    - **Update Insurance Validity**:
        ```bash
        PUT /patients/insurance
        Headers:
          dob: <date-of-birth>
          firstname: <first-name>
          lastname: <last-name>
        Body (JSON):
          {
            "insuranceValid": true/false
          }
        ```

    - **Update Prescription Fill/Refill Status**:
        ```bash
        PUT /patients/prescriptions
        Headers:
          dob: <date-of-birth>
          firstname: <first-name>
          lastname: <last-name>
        Body (JSON):
          {
            "prescriptionId": <id>,
            "fillStatus": "Filled/Not Filled",
            "refills": <number-of-refills>
          }
        ```

    - **Delete Patient and Their Records**:
        ```bash
        DELETE /patients
        Headers:
          dob: <date-of-birth>
          firstname: <first-name>
          lastname: <last-name>
        ```

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
