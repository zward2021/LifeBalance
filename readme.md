# LifeBalance ⚖️

LifeBalance is a personal life-balance tracking web application designed to help users keep track of important areas of their lives and identify areas that may need more attention.

Instead of focusing only on tasks and productivity, LifeBalance helps users maintain awareness of different parts of their lives, including school, work, relationships, self-care, health, and recreation.

## 🌱 Purpose

It can be easy to focus heavily on one part of life while unintentionally neglecting another. LifeBalance addresses this by allowing users to record activities and see when they last spent time on each area.

The application uses recent activity to identify areas that may need attention and provides a simple recommended focus.

## ✨ Current Features

* Personal Life Balance dashboard
* Six life categories:

  * 🎓 School
  * 💼 Work
  * ❤️ Family & Friends
  * 🧘 Self-Care
  * 🏃 Health & Fitness
  * 🎮 Fun & Recreation
* Activity logging
* Activity history
* Activity deletion
* Last-activity tracking
* Automatic focus recommendation
* Responsive user interface
* GitHub-based deployment workflow

## 🔮 Planned Features

Future development will expand the application with:

* User registration and login
* Secure user authentication
* Persistent database storage
* Activity editing
* Individual user profiles
* More detailed life-balance statistics
* Improved recommendations
* Additional life categories
* Deployed production version

## 🛠️ Technologies

### Frontend

* React
* JavaScript
* Vite
* CSS

### Backend / Database

The completed application is planned to use:

* Supabase
* Supabase Authentication
* Supabase PostgreSQL database

### Development & Deployment

* Git
* GitHub
* GitHub Actions
* GitHub Pages

## 📊 How LifeBalance Works

Users record activities and assign each activity to a life category.

For example:

> **Category:** Family & Friends
> **Activity:** Dinner with family
> **Date:** September 27, 2026

LifeBalance keeps track of the most recent activity for each category.

If an area has not been logged recently, the dashboard can identify it as an area that may need additional attention.

For example:

> 💡 **Recommended Focus**
>
> Give some attention to Family & Friends.
>
> It has been several days since your last activity in this area.

The goal is not to tell users how they should live, but to provide a simple reminder about areas they may have overlooked.

## 📁 Project Structure

```text
LifeBalance/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Running the Project

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🌐 Deployment

The project is configured to use GitHub Actions for deployment to GitHub Pages.

Changes pushed to the `main` branch trigger the deployment workflow.

Once deployment is active, the application will be available at:

https://zward2021.github.io/LifeBalance/

## 📌 Project Status

**Current stage:** Frontend prototype

The current version focuses on the user interface, activity tracking, life-category dashboard, and recommendation functionality.

The next major development stage is connecting the application to a database and implementing user authentication.

## 🎓 Academic Project

LifeBalance is being developed as an individual Engineering Design 2 project.

The project demonstrates concepts including:

* AI-assisted software development
* Frontend development
* Backend and database integration
* CRUD operations
* User authentication
* Git and GitHub
* Continuous deployment
* Software project organization

## 👨‍💻 Author

**Ben**

GitHub: https://github.com/zward2021
