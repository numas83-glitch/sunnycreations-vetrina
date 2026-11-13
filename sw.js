// Solo notifiche push dell'admin: nessuna cache, la pagina arriva sempre dalla rete.
self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data.json(); } catch (_) { d = { body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'SunnyCreations', { body: d.body || '', icon: 'icon-192.png' }));
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
    for (const c of list) if (c.url.includes('#admin') && 'focus' in c) return c.focus();
    return clients.openWindow('./#admin');
  }));
});
