# Payment Dashboard

A full-stack web application built with Node.js, React, and MySQL for managing users, bills, payments, permissions, and audit logs.

## Repositories

- [Frontend](https://github.com/arnisto/payment-dashboard-front)
- [Backend](https://github.com/arnisto/payment-dashboard-back)

## Prerequisites

- Node.js (v18 or higher)
- MySQL Server
- Git

## 1. Install MySQL

### On Linux/macOS

```bash
sudo apt install mysql-server
```

### On Windows

Download and install MySQL Server from:  
https://dev.mysql.com/downloads/mysql/

After installation, open the MySQL CLI or MySQL Workbench and run:

```sql
CREATE DATABASE payment_dashboard;
```

## 2. Clone the Repositories

```bash
git clone https://github.com/arnisto/payment-dashboard-back
git clone https://github.com/arnisto/payment-dashboard-front
```

## 3. Backend Setup

```bash
cd payment-dashboard-back
npm install
```

### Create `.env` file in `payment-dashboard-back`

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=payment_dashboard
MAIL_USER=your.email@gmail.com
MAIL_PASS=your_app_password
```

### Seed the Database

Before starting the server, run:

```bash
node seed.js
```

This will populate the database with initial data.

### Add script to `package.json`

```json
"scripts": {
  "dev": "nodemon src/app.js"
}
```

### Start the backend server

```bash
npm run dev
```

## 4. Frontend Setup

```bash
cd ../payment-dashboard-front
npm install
```

### Create `.env` file in `payment-dashboard-front`

```
VITE_API_BASE_URL=http://localhost:3000/api
```

### Start the frontend app

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 5. Email Integration

- Nodemailer is used to send emails when users are created or updated
- Configure `MAIL_USER` and `MAIL_PASS` in `.env`
- Email templates are located in `src/templates/credentials.template.js`

## 6. Internationalization

- English and French supported via `react-i18next`
- Translation files: `src/locales/en.json`, `fr.json`
- Language switcher available in header or sidebar
- Language preference stored in `localStorage`

## 7. Contribution Guide

```bash
# Fork the repository
# Create a new branch
git checkout -b feature/your-feature-name

# Make your changes
# Commit and push
git commit -m "Add feature"
git push origin feature/your-feature-name

# Open a pull request
```

Please follow the existing code style and document any new components or services.

## License

This project is licensed under the MIT License.
