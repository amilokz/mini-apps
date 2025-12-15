let db;
const request = indexedDB.open('MiniAppsDB', 1);

request.onupgradeneeded = e => {
  db = e.target.result;
  if(!db.objectStoreNames.contains('tasks')) db.createObjectStore('tasks', { keyPath: 'id' });
  if(!db.objectStoreNames.contains('weather')) db.createObjectStore('weather', { keyPath: 'city' });
};

request.onsuccess = e => db = e.target.result;
request.onerror = e => console.error('IndexedDB error', e);

function saveTaskToDB(task) {
  const tx = db.transaction('tasks', 'readwrite');
  tx.objectStore('tasks').put(task);
  return tx.complete;
}

function saveWeatherToDB(city, data) {
  const tx = db.transaction('weather', 'readwrite');
  tx.objectStore('weather').put({ city, data, time: Date.now() });
  return tx.complete;
}

function getWeatherFromDB(city) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('weather', 'readonly');
    const req = tx.objectStore('weather').get(city);
    req.onsuccess = () => resolve(req.result?.data || null);
    req.onerror = () => reject(null);
  });
}
