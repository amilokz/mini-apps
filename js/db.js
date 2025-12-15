document.addEventListener("DOMContentLoaded", () => {
  let db;
  const request = indexedDB.open('MiniAppsDB', 1);

  request.onupgradeneeded = e => {
    db = e.target.result;
    if (!db.objectStoreNames.contains('tasks')) db.createObjectStore('tasks', { keyPath: 'id', autoIncrement:true });
    if (!db.objectStoreNames.contains('weather')) db.createObjectStore('weather', { keyPath: 'city' });
  };

  request.onsuccess = e => db = e.target.result;
  request.onerror = e => console.error('IndexedDB error', e);

  window.db = db; // global access
  window.saveTaskToDB = function(task) {
    if (!db) return;
    const tx = db.transaction('tasks', 'readwrite');
    tx.objectStore('tasks').put({ task, id: Date.now() });
  };
  window.saveWeatherToDB = function(city, data) {
    if (!db) return;
    const tx = db.transaction('weather', 'readwrite');
    tx.objectStore('weather').put({ city, data, time: Date.now() });
  };
  window.getWeatherFromDB = function(city) {
    return new Promise((resolve, reject) => {
      if (!db) return resolve(null);
      const tx = db.transaction('weather', 'readonly');
      const req = tx.objectStore('weather').get(city);
      req.onsuccess = () => resolve(req.result?.data || null);
      req.onerror = () => reject(null);
    });
  };
});
