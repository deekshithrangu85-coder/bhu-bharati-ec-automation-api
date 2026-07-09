# Bhu Bharati EC Automation API

Node.js

Playwright

Express.js

Swagger / OpenAPI

MIT License

A Playwright-based REST API that automates the retrieval of **Encumbrance Certificate (EC)** documents from the **Bhu Bharati Telangana Portal**.

The application accepts land details through a REST API, launches a Chromium browser, waits for manual authentication (OTP/CAPTCHA), automatically navigates to the **Search EC Details** page, selects the required **District → Mandal → Village → Survey Number → Khata Number**, searches for the EC record, downloads the generated PDF, and returns it directly through the API response.

Manual authentication (OTP/CAPTCHA) is intentionally left to the user since these security mechanisms cannot and should not be automated.

---

# ✨ Features

- 🔐 Guided manual login (OTP/CAPTCHA compatible)
- 🌐 Automatic browser automation using Playwright
- 🗺️ Automatic navigation from Citizen Dashboard to Search EC Details
- 📍 Dynamic selection of District → Mandal → Village → Survey Number → Khata Number
- 🔄 Handles dependent dropdowns using AJAX synchronization
- 🎯 Intelligent fuzzy matching for dropdown values
- 📄 Automatic EC search
- 📥 Automatic EC PDF download
- 📤 Returns downloaded PDF directly through the REST API
- 📚 Interactive Swagger/OpenAPI documentation
- 🩺 Detailed logging and debugging information
- ⚠️ Graceful handling of portal alerts, timeout errors and invalid land records

---

# 🧰 Technologies Used

- Node.js
- Express.js
- Playwright
- Chromium Browser
- JavaScript (ES6)
- Swagger / OpenAPI
- dotenv
- Morgan
- CORS

---

# 📦 Prerequisites

- Node.js v18 or later
- npm
- Chromium Browser (installed automatically by Playwright)
- Windows, macOS or Linux
- Valid Bhu Bharati Citizen Portal account
- Registered mobile number for OTP verification

---

# 🛠 Installation

### Clone the Repository

```bash
git clone https://github.com/deekshithrangu85-coder/bhu-bharati-ec-api.git

cd bhu-bharati-ec-api
```

### Install Dependencies

```bash
npm install
```

### Install Playwright Browser

```bash
npx playwright install chromium
```

---

# 📂 Project Structure

```text
bhu-bharati-ec-api/

├── controllers/
│     ecController.js
│
├── routes/
│     ecRoutes.js
│
├── services/
│     playwrightService.js
│
├── downloads/
│
├── swagger.js
├── server.js
├── package.json
├── .env
├── README.md
├── DEPLOYMENT.md
└── TEST_REPORT.md
```

---

# ⚙ Configuration

Create a `.env` file.

```env
PORT=3000
```

---

# ▶️ Running the Application

### Development

```bash
npm run dev
```

### Production

```bash
node server.js
```

The server starts on:

```
http://localhost:3000
```

---

# 📚 API Documentation

Interactive Swagger documentation is available at:

```
http://localhost:3000/api-docs
```

Swagger provides:

- API endpoint details
- Request body schema
- Response schema
- Error responses

---

# 🚀 API Endpoint

### Download EC PDF

**POST**

```
POST /api/ec/download
```

### Request Body

```json
{
    "district":"Bhadradri Kothagudem",
    "mandal":"Burgampadu",
    "village":"Mothepattinagar",
    "surveyNo":"6/1",
    "khataNo":"248"
}
```

---

# 🔄 Automation Workflow

| Step | Process | Performed By |
|------|----------|--------------|
| 1 | Launch Chromium Browser | Script |
| 2 | Open Bhu Bharati Login Page | Script |
| 3 | Enter Mobile Number | User |
| 4 | Complete OTP & CAPTCHA | User |
| 5 | Login Successfully | User |
| 6 | Navigate to Citizen Dashboard | Script |
| 7 | Open Search EC Details | Script |
| 8 | Select District | Script |
| 9 | Wait for Mandal Dropdown | Script |
| 10 | Select Mandal | Script |
| 11 | Wait for Village Dropdown | Script |
| 12 | Select Village | Script |
| 13 | Wait for Survey Number | Script |
| 14 | Select Survey Number | Script |
| 15 | Wait for Khata Number | Script |
| 16 | Select Khata Number | Script |
| 17 | Search EC | Script |
| 18 | Download EC PDF | Script |
| 19 | Return PDF Response | Script |

---

# 📥 Successful Response

Returns the downloaded EC PDF.

```
HTTP/1.1 200 OK
Content-Type: application/pdf
```

---

# ❌ Error Response

```json
{
    "success": false,
    "message": "No EC records found for the provided land details."
}
```

---

# 🧠 Intelligent Dropdown Handling

The Bhu Bharati portal loads dropdown values dynamically using AJAX.

The automation handles this by:

- Waiting for AJAX requests to complete
- Monitoring dropdown refresh events
- Comparing dropdown option snapshots
- Intelligent fuzzy matching
- Sequential synchronization of dependent dropdowns

This approach ensures reliable automation even when portal response times vary.

---

# 📁 Output

Every successful request downloads the EC PDF into:

```
downloads/

EC_<timestamp>.pdf
```

The same PDF is immediately returned through the API response.

---

# 🩺 Troubleshooting

| Problem | Possible Cause | Solution |
|----------|----------------|----------|
| Browser stops after login | OTP/CAPTCHA not completed | Complete authentication manually |
| Survey dropdown not loading | Village dropdown still loading | Wait for synchronization |
| Khata dropdown not loading | Survey selection incomplete | Verify Survey Number |
| No EC record found | Invalid land details | Verify Survey Number and Khata Number |
| Timeout Error | Slow portal response | Retry request |
| Invalid request | Incorrect request body | Verify all required fields |

---

# ⚙ Request Parameters

| Field | Description |
|--------|-------------|
| district | District Name |
| mandal | Mandal Name |
| village | Village Name |
| surveyNo | Survey Number / Sub-Division Number |
| khataNo | Khata Number |

Example:

```json
{
    "district":"Bhadradri Kothagudem",
    "mandal":"Burgampadu",
    "village":"Mothepattinagar",
    "surveyNo":"6/1",
    "khataNo":"248"
}
```

---

# 📄 Additional Documentation

The repository also includes:

- README.md
- DEPLOYMENT.md
- TEST_REPORT.md
- Swagger/OpenAPI Documentation

---

# ⚠ Disclaimer

This project automates interaction with the public **Bhu Bharati Telangana Portal** for educational and authorized record retrieval purposes only.

The automation does **not** bypass OTP, CAPTCHA, or any authentication mechanism. Authentication is intentionally completed manually by the user.

Users are responsible for complying with the portal's Terms of Service and all applicable government regulations.

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 🖼 Screenshots

Include screenshots for:

- Login Page
- Citizen Dashboard
- Search EC Details
- Filled Search Form
- EC Result
- Downloaded PDF
- Swagger Documentation
- Postman Response

---

The automation performs the following:

- Opens the Bhu Bharati Portal
- Supports manual OTP authentication
- Navigates automatically to Search EC Details
- Selects District, Mandal, Village, Survey Number and Khata Number
- Searches the Encumbrance Certificate
- Downloads the generated EC PDF
- Returns the PDF through the REST API

---

# 🚀 Future Improvements

- Secure session reuse
- Automatic session restoration
- Docker support
- GitHub Actions CI/CD
- Input validation middleware enhancements
- Winston logging
- AWS EC2 deployment
- Automatic retry mechanism
- Unit and Integration Testing
- Configurable browser settings

---

# 👨‍💻 Author

## Deekshith Rangu

Backend Developer | Java | Spring Boot | Node.js | REST APIs | Playwright | Browser Automation

**GitHub:** https://github.com/deekshithrangu85-coder