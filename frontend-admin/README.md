# 🎛️ Frontend Admin — Banda Corta Jukebox

Il pannello di controllo dedicato ai membri della band Banda Corta.  
Consente di gestire eventi, repertori, canzoni, richieste degli ospiti e fasi dell’evento, tutto in **tempo reale** tramite WebSocket.

---

## 🖥️ Scopo

Il **Frontend Admin** permette la gestione completa dell’applicazione:

- 🔐 Login per accedere alla dashboard
- 🏠 **Home page dinamica** con:
  - Dettagli dell’evento attivo
  - Cambio fase dell’evento (**CENA ↔ BALLO**) con aggiornamento in tempo reale degli ospiti
  - Numero di ospiti collegati
  - **Pannello richieste in arrivo** con possibilità di **accettare o rifiutare** brani
- 📅 Gestione **CRUD eventi**
- 🎼 Gestione **CRUD canzoni**
- ➕ Pagina dedicata alla **registrazione di nuovi admin**
- 🔒 Logout

Ogni azione rilevante è sincronizzata in tempo reale con il backend tramite WebSocket / STOMP.

---

## ⚙️ Funzionalità principali

- 🔄 **Cambio fase evento** (con invio notifica live ai guest)
- 📩 Gestione richieste in tempo reale  
  (accetta / rifiuta con aggiornamento immediato)
- 👥 Monitoraggio ospiti collegati
- 🗃️ **CRUD completo**
  - Eventi
  - Canzoni
- 🧑‍💼 Registrazione nuovi admin
- ✔️ Dashboard moderna e responsive con React + Tailwind

---

## 🔗 Connessione WebSocket

Il frontend admin utilizza STOMP + SockJS per comunicare via WebSocket con il backend.

### **Topic e Endpoints WebSocket utilizzati**

#### 📤 Invio messaggi
/app/event/change-phase
/app/requests/create
/app/requests/update

#### 📥 Sottoscrizioni (ascolto)
/topic/event/{accessCode}/phase # Ricezione cambio fase evento
/topic/event/{accessCode}/requests # Ricezione nuove richieste guest
/topic/event/{accessCode}/requests/{guestId} # Risposta diretta al singolo guest


---

## 🧩 Stack Tecnologico

- ⚛️ **React + Vite**
- 📡 **SockJS + STOMP** per WebSocket realtime
- 🎨 **TailwindCSS** per lo styling
- 🔐 JWT authentication (via backend)
- 🔄 Axios per chiamate REST

---

## 🚀 Setup & Run

### 1️⃣ Installazione dipendenze
npm install
npm run dev
Il progetto parte su:
http://localhost:5173

---

## 🌍 Deploy/Demo
https://juke-box-app-nine.vercel.app/


