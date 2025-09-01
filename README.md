
# Vacation Apartment Rentals

A full-stack web application for managing and renting vacation apartments across Israel.  
The platform allows users to browse available apartments with advanced filtering, and property owners to manage their listings easily.  

---

## 🚀 Features
- Browse and rent vacation apartments across Israel.
- Filters by:
  - Number of beds
  - Price
  - City
  - Apartment type
- Dynamic forms and generic components.
- Intuitive user interface.
- Built with a **3-layer architecture**: Controllers, Models, Routers.

---

## 🛠️ Tech Stack
- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Other Libraries/Tools:**
  - dotenv
  - nodemailer
  - bcrypt
  - jsonwebtoken
  - mongoose

---

## 📂 Project Structure
```
Vacation-apartment-rentals/
├── Node/
│   └── API/
│       ├── controllers/
│       ├── models/
│       └── routers/
└── React/
    └── src/
        ├── cities/
        ├── comps/
        ├── pics/
        ├── redux/
        ├── App.js
        └── ...
```

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB

### Backend Setup
```bash
cd Node/API
npm install
npm start
```

### Frontend Setup
```bash
cd React
npm install
npm start
```

The backend will run on your configured server (default: http://localhost:5000)  
The frontend will run on http://localhost:3000.

---

## 🖼️ Adding Images
To add screenshots or images:
1. Create a folder called `assets` in your project root or inside `React/src`.
2. Place your images there.
3. Use Markdown syntax in this README:
```markdown
![Alt Text](./assets/screenshot.png)
```

---

## 📌 Project Status
✅ Completed and ready to use.

---

## 📜 License
This project is currently not licensed.  
If you want to make it open-source, you can choose a license from https://choosealicense.com/.
