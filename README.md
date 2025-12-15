# Mini Apps

**Mini Apps** is a modern, minimal, and fully offline-capable Progressive Web App (PWA) that combines three small utilities in one place:

- **To-Do App** – Add, view, and delete tasks with offline storage.
- **Weather App** – Check weather for any city with offline caching.
- **Calculator** – Basic arithmetic calculator with a responsive design.

---

## 🌐 Live Demo

Check the app live here: [Mini Apps Live](https://amilokz.github.io/mini-apps/)

---

## 📂 Project Structure

mini-apps/
│ index.html
│ manifest.json
│ service-worker.js
│ style.css
├───favicon/
│ apple-touch-icon.png
│ favicon-96x96.png
│ favicon.ico
│ favicon.svg
│ site.webmanifest
│ web-app-manifest-192x192.png
│ web-app-manifest-512x512.png
├───icons/
│ icon-192.png
│ icon-512.png
└───js/
calculator.js
db.js
main.js
todo.js
weather.js

yaml
Copy code

---

## 💻 Features

- **Responsive Design:** Works on desktop and mobile.
- **Offline Capable (PWA):** Can be installed as an app and works offline.
- **To-Do App:** Add, view, and delete tasks. Tasks are stored in `localStorage` and IndexedDB for offline use.
- **Weather App:** Fetch weather from OpenWeatherMap API with offline caching.
- **Calculator:** Simple arithmetic calculator.
- **Splash Screen & Notifications:** PWA splash animation and push notifications.
- **Bootstrap 5 & Font Awesome:** Clean, modern UI.

---

## ⚡ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5
- Font Awesome
- IndexedDB
- Service Worker (PWA)
- GitHub Pages (Deployment)

---

## 🚀 Installation / Usage

1. Clone the repository:

```bash
git clone https://github.com/amilokz/mini-apps.git
cd mini-apps
Open index.html in your browser, or deploy it to a static host like GitHub Pages.

You can also install it as a PWA on mobile or desktop for offline use.

🔧 How To Use
To-Do App: Enter a task and click "Add Task". Click the trash/delete button to remove a task. Tasks are saved offline.

Weather App: Enter a city name and click "Search". If offline, last cached data will be shown.

Calculator: Click numbers and operations, then = to calculate.

📱 PWA Features
Installable on desktop and mobile.

Works offline using service worker caching.

Push notifications for tasks and reminders.

Splash screen animation on load.

IndexedDB for storing tasks and weather data offline.

👨‍💻 Author
Komil Hassan

GitHub

📄 License
This project is open-source and free to use.







