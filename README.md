# 🎵 Banda Corta Jukebox
**Repository: JukeBox-App**

Un sistema completo per gestire le richieste musicali dal vivo durante eventi come matrimoni, feste private e serate live della mia band **Banda Corta**.  
Gli ospiti interagiscono tramite un'interfaccia dedicata, mentre la band controlla in tempo reale richieste, repertorio e fase dell’evento.

---

## ✨ Caratteristiche principali

### 👥 Guest (Ospiti)
- Accedono tramite QR Code  
- Inseriscono il loro nome per creare una *Guest Session*
- Visualizzano il **Banda Corta Jukebox** (UI interamente personalizzata)
- Vengono aggiornati in tempo reale sulla fase dell’evento:  
  - 🍽️ **CENA**  
  - 💃 **BALLO**
- Il repertorio cambia automaticamente in base alla fase
- Possono richiedere **max 3 brani ogni 10 minuti** (controllo per evitare spam)
- Non possono richiedere due volte lo stesso brano
- Hanno accesso alle pagine *Contact* e *About* con informazioni utili e contatti della band

### 🛠️ Admin
- Login tramite autenticazione JWT
- Dashboard real-time con:
  - Evento attivo
  - Fase corrente dell'evento
  - Elenco richieste aggiornate live
- Possibilità di cambiare fase (notificando tutti i guest in tempo reale)
- Gestione completa via CRUD di:
  - 🎤 Repertorio (Songs)
  - 🎉 Eventi
  - 👤 Admin users
- Logout sicuro

---

## 🧩 Struttura del Progetto

### 1️⃣ Backend (Spring Boot)
Gestisce:
- Eventi
- Song / Repertori
- Richieste degli ospiti
- Guest Session automatiche
- Admin Users tramite autenticazione JWT
- WebSocket con STOMP per comunicazioni real-time

### 2️⃣ Frontend Admin (React)
- Interfaccia gestionale
- CRUD completo
- Dashboard live richieste
- Controllo fase evento

### 3️⃣ Frontend Guest (React)
- Accesso semplice tramite QR Code
- Inserimento nome
- Jukebox interattivo
- Lista canzoni filtrabile
- Invio richieste in tempo reale

---

## 🔧 Stack Tecnologico

### 🖥️ Backend
- Spring Boot  
- Spring Web  
- Spring Security + JWT  
- Spring Data JPA  
- PostgreSQL  
- WebSocket con STOMP  
- Validation (Hibernate Validator)

### 💻 Frontend Guest & Admin
- React  
- react-router-dom  
- TailwindCSS  
- axios  
- SockJS + StompJS per WebSocket live  
- React Bootstrap Icons  

---

## 🚀 Avvio del Progetto

### 📦 Backend
1. Importa in **IntelliJ**  
2. Avvia il progetto Spring Boot  
3. Un admin iniziale viene generato tramite variabili d’ambiente (`env.properties`)

### 🧪 Frontend Admin & Guest
1. Apri il terminale nel progetto  
2. Installa le dipendenze:  
npm install
3. Avvia:

**Guest:**
npm run dev (porta 5174)

**Admin:**
npm run dev (porta 5173)



---

## 📡 Comunicazioni Real-Time
- Tutte le richieste degli ospiti arrivano su:  
/topic/event/{accessCode}/requests
- Il cambio fase:  
/topic/event/{accessCode}/phase
Guest e Admin vengono aggiornati live.

---

## 📜 Autore
👤 **Amedeo Mignano**  
GitHub: https://github.com/AmedeoMignano


