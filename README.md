# 📊 Chart Vision

> Interactive data visualization dashboard built with React, Vite, Recharts, and Tailwind CSS.

Chart Vision is a frontend data visualization project that allows users to explore different chart types and build their own charts using custom data.

## ✨ Features

- 📈 Line charts
- 📊 Bar charts
- 📉 Area charts
- 🛠️ Custom chart builder
- ➕ Add custom data
- ✏️ Edit existing data
- 🗑️ Delete data
- 💾 Persistent data using browser `localStorage`
- 🔄 Dynamic chart updates
- 📱 Responsive interface
- 🧭 Client-side routing
- 🎨 Dark-themed dashboard

## 📊 Available Charts

### Line Chart

Visualizes changes in users and sales over time.

### Bar Chart

Compares users and sales across different data points.

### Area Chart

Displays trends using filled areas beneath the data lines.

## 🛠️ Chart Builder

The Chart Builder allows users to create their own datasets.

Users can:

1. Add a label for each data point.
2. Enter user values.
3. Enter sales values.
4. Add the data to the dataset.
5. Edit existing rows.
6. Delete rows.
7. Clear all stored data.
8. Visualize the dataset using Line, Bar, or Area charts.

Custom data is stored in the browser using:

```text
localStorage
```

## 🧭 Application Routes

```text
/
└── /dashboard
    ├── /charts/line
    ├── /charts/bar
    ├── /charts/area
    └── /charts/chart-builder
```

The root route redirects users to the dashboard.

## 🏗️ Architecture

```text
React Application
       │
       ▼
React Router
       │
       ├── Dashboard
       │
       ├── Line Chart
       │
       ├── Bar Chart
       │
       ├── Area Chart
       │
       └── Chart Builder
                │
                ▼
            localStorage
                │
                ▼
          Chart Data
                │
       ┌────────┼────────┐
       ▼        ▼        ▼
     Line      Bar      Area
    Chart     Chart     Chart
```

## 🛠️ Tech Stack

### Frontend

- React 19
- JavaScript
- Vite

### Data Visualization

- Recharts

### Styling

- Tailwind CSS

### Routing

- React Router

### Icons

- React Icons

### Development Tools

- ESLint
- PostCSS
- Autoprefixer

## 📂 Project Structure

```text
Chart Vision/
│
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
│
└── src/
    ├── App.css
    ├── App.jsx
    ├── data.js
    ├── index.css
    ├── main.jsx
    ├── Router.jsx
    │
    └── Pages/
        ├── AreaChart.jsx
        ├── BarChart.jsx
        ├── ChartBuilder.jsx
        ├── Dashboard.jsx
        └── LineChart.jsx
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate into the project:

```bash
cd "Chart Vision"
```

Install dependencies:

```bash
npm install
```

## 💻 Development

Start the development server:

```bash
npm run dev
```

Vite will provide the local development URL in the terminal.

## 🏗️ Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 🔍 Linting

Run ESLint:

```bash
npm run lint
```

## 📦 Main Dependencies

```text
react
react-dom
react-icons
react-router-dom
recharts
```

## 🎯 Project Purpose

Chart Vision was built to explore:

- React component architecture
- Client-side routing
- Data visualization
- Recharts
- Form handling
- Browser storage
- Dynamic UI updates
- Responsive frontend development

The project focuses on turning structured data into simple and interactive visualizations.

## 📌 Current Scope

Chart Vision is a **frontend-only application**.

It currently does not use:

- Backend APIs
- Database
- User authentication
- External server-side storage

Custom chart data is stored locally in the browser using `localStorage`.

## 👨‍💻 Author

**Sohail Khan**

GitHub: https://github.com/Developer-Sohail786
