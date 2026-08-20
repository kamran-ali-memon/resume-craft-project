# ResumeCraft — Full Stack Resume Builder

A complete responsive resume builder built with:

- React + Vite
- Tailwind CSS v4
- React Router
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- Responsive dashboard and resume editor
- Live resume preview
- Resume CRUD (create, read, update, delete)

## Project structure

```text
ResumeCraft/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   └── package.json
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── .env.example
│   └── package.json
└── README.md
```

## 1. Backend setup

Open a terminal:

```bash
cd backend
npm install
```

Create `.env` from `.env.example`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=replace_this_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

Then run:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

## 2. Frontend setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## 3. MongoDB Atlas

Use the MongoDB Atlas connection string from your cluster.

Example format:

```text
mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/resumecraft
```

Do NOT put the connection string in frontend code.

The database is created automatically when the first user/resume is saved.

## 4. Main features

### Authentication
- Register
- Login
- Logout
- JWT protected routes
- Password hashing with bcrypt

### Resume management
- Create multiple resumes
- Edit resumes
- Delete resumes
- Dashboard with resume cards
- Automatic timestamps

### Resume sections
- Personal information
- Professional summary
- Skills
- Education
- Experience
- Projects
- Languages

### Preview
- Desktop resume preview
- Mobile-friendly preview
- Print/download through browser print dialog
- Clean professional layout

## 5. Important

The frontend stores the JWT token in localStorage for this student project. For a production application, httpOnly secure cookies are preferable.

## 6. Recommended first test

1. Start MongoDB Atlas.
2. Start backend.
3. Start frontend.
4. Open `http://localhost:5173`.
5. Register an account.
6. Create a resume.
7. Add your information.
8. Save it.
9. Open Preview.
