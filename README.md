# Bhu Bharati EC Automation API

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Playwright](https://img.shields.io/badge/Playwright-Automation-success)
![Express.js](https://img.shields.io/badge/Express.js-REST%20API-blue)
![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-brightgreen)
![License](https://img.shields.io/badge/License-MIT-orange)

A **Playwright-based REST API** that automates the retrieval of **Encumbrance Certificate (EC)** documents from the **Bhu Bharati Telangana Portal**.

The application accepts land details through a REST API, launches a Chromium browser, waits for manual authentication (OTP/CAPTCHA), automatically navigates to the **Search EC Details** page, selects the required **District → Mandal → Village → Survey Number → Khata Number**, searches for the EC record, downloads the generated PDF, and returns it directly through the API response.

> **Note:** OTP and CAPTCHA verification are intentionally performed manually, as they are security mechanisms that should not be automated.

---

# ✨ Features

- 🔐 Manual OTP & CAPTCHA compatible authentication
- 🌐 Browser automation using Playwright
- 🗺️ Automatic navigation to Search EC Details
- 📍 Dynamic selection of District → Mandal → Village → Survey Number → Khata Number
- 🔄 Intelligent handling of AJAX-dependent dropdowns
- 🎯 Fuzzy matching for dropdown values
- 📄 Automatic Encumbrance Certificate search
- 📥 Automatic EC PDF download
- 📤 Returns downloaded PDF directly through REST API
- 📚 Interactive Swagger/OpenAPI documentation
- 📝 Detailed logging and debugging support
- ⚠️ Graceful handling of alerts, timeouts and invalid records

---

# ⭐ Project Highlights

- REST API built using Express.js
- Playwright browser automation
- Automatic synchronization of dependent dropdowns
- Dynamic AJAX handling
- Swagger/OpenAPI documentation
- Modular project architecture
- Robust exception handling
- Professional project documentation

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
- Windows / Linux / macOS
- Valid Bhu Bharati Citizen Portal account
- Mobile number registered for OTP verification

---

# 🛠 Installation

### Clone Repository

```bash
git clone https://github.com/deekshithrangu85-coder/bhu-bharati-ec-automation-api.git

cd bhu-bharati-ec-automation-api
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
bhu-bharati-ec-automation-api/

├── controllers/
│     ecController.js
│
├── routes/
│     ecRoutes.js
│
├── services/
│     playwrightService.js
│
├── screenshots/
│
├── downloads/
│
├── swagger.js
├── server.js
├── package.json
├── .env
├── README.md
└── DEPLOYMENT.md
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

Swagger includes:

- API Endpoint
- Request Schema
- Response Schema
- Error Responses

---

# 🚀 API Endpoint

## Download EC PDF

**POST**

```
POST /api/ec/download
```

### Request Body

```json
{
  "district": "Bhadradri Kothagudem",
  "mandal": "Burgampadu",
  "village": "Mothepattinagar",
  "surveyNo": "6/1",
  "khataNo": "248"
}
```

---

# 🔄 Automation Workflow

| Step | Process | Performed By |
|------|----------|--------------|
| 1 | Launch Chromium Browser | Script |
| 2 | Open Bhu Bharati Login | Script |
| 3 | Enter Mobile Number | User |
| 4 | Complete OTP & CAPTCHA | User |
| 5 | Login Successfully | User |
| 6 | Navigate to Citizen Dashboard | Script |
| 7 | Open Search EC Details | Script |
| 8 | Select District | Script |
| 9 | Wait for Mandal Data | Script |
| 10 | Select Mandal | Script |
| 11 | Wait for Village Data | Script |
| 12 | Select Village | Script |
| 13 | Wait for Survey Numbers | Script |
| 14 | Select Survey Number | Script |
| 15 | Wait for Khata Numbers | Script |
| 16 | Select Khata Number | Script |
| 17 | Search EC | Script |
| 18 | Download EC PDF | Script |
| 19 | Return PDF Response | Script |

---

# 📥 Successful Response

```
HTTP/1.1 200 OK

Content-Type: application/pdf
```

The API returns the downloaded EC PDF.

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

The Bhu Bharati portal loads location data asynchronously using AJAX.

The automation ensures reliable execution by:

- Waiting for AJAX requests to complete
- Monitoring dropdown refresh events
- Comparing dropdown option snapshots
- Sequential synchronization of dependent dropdowns
- Intelligent fuzzy matching of dropdown labels

This approach significantly improves automation reliability under varying portal response times.

---

# 📁 Output

Every successful request downloads the EC PDF into:

```
downloads/

EC_<timestamp>.pdf
```

The same PDF is immediately returned to the API client.

---

# 🩺 Troubleshooting

| Problem | Possible Cause | Solution |
|----------|----------------|----------|
| Browser stops after login | OTP/CAPTCHA incomplete | Complete authentication manually |
| Survey dropdown not loading | Village data still loading | Wait for synchronization |
| Khata dropdown not loading | Survey not selected | Verify Survey Number |
| No EC record found | Invalid land details | Verify Survey & Khata details |
| Timeout Error | Slow portal response | Retry request |
| Invalid Request | Missing or incorrect fields | Verify request body |

---

# ⚙ Request Parameters

| Field | Description |
|--------|-------------|
| district | District Name |
| mandal | Mandal Name |
| village | Village Name |
| surveyNo | Survey Number / Sub-Division Number |
| khataNo | Khata Number |

---

# 📄 Additional Documentation

The repository also contains:

- README.md
- DEPLOYMENT.md
- Swagger/OpenAPI Documentation

---

# 🖼 Screenshots

## Login Page

![Login Page](screenshots/01-home-page.png)

---

## Search EC Details

![Search EC](screenshots/02.png)

---

## Filled Search Form

![Filled Form](screenshots/03.png)

---

## Postman Response

![Postman](screenshots/04%20Postman%20output.png)

---

## Swagger Documentation

![Swagger](screenshots/05%20Swagger.png)

---

# 🚀 Future Improvements

- Secure session reuse
- Automatic session restoration
- Docker support
- GitHub Actions CI/CD
- Enhanced input validation
- Winston logging
- AWS EC2 deployment
- Automatic retry mechanism
- Unit & Integration Testing
- Configurable browser options

---

# ⚠ Disclaimer

This project automates interaction with the public **Bhu Bharati Telangana Portal** for educational and authorized record retrieval purposes only.

The automation **does not bypass OTP, CAPTCHA, or any authentication mechanism**. User authentication is intentionally performed manually.

Users are responsible for complying with the portal's Terms of Service and applicable government regulations.

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

## Deekshith Rangu

Backend Developer | Java | Node.js | Express.js | Playwright | REST APIs | Browser Automation

**GitHub:**  
https://github.com/deekshithrangu85-coder

Backend Developer | Java | Spring Boot | Node.js | REST APIs | Playwright | Browser Automation

**GitHub:** https://github.com/deekshithrangu85-coder
