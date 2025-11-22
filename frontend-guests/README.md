# 🎧 Frontend Guest — Banda Corta Jukebox

Interfaccia dedicata agli ospiti degli eventi Banda Corta.  
Gli utenti accedono tramite QR Code, inseriscono il loro nome e possono richiedere brani in tempo reale con un’interfaccia stile **Jukebox**, aggiornata automaticamente in base alla fase dell’evento.

---

## ⚛️ Framework
**React + Vite**

---

## 💬 Descrizione

Il frontend guests rappresenta la vista dedicata agli ospiti dell’evento.  
Il flusso dell’utente è il seguente:

1. 🔲 **Scansiona un QR Code** presente all’evento  
2. 🪪 Viene indirizzato alla pagina di benvenuto dove inserisce il proprio **nome**  
3. 🔑 Al login viene creata una **Guest Session**
4. 🎉 L’utente viene reindirizzato automaticamente alla pagina dell’evento tramite il suo **accessCode**
5. 🎵 Accede al **Banda Corta Jukebox**, un’interfaccia realizzata con Tailwind

### 🎼 Funzionalità principali del Jukebox

- Ricerca brani tramite **barra di ricerca**
- Visualizzazione dinamica del repertorio **in base alla fase dell’evento** (CENA / BALLO)
- Ogni ospite può richiedere **massimo 3 brani ogni 10 minuti**  
  *(limite gestito dal backend per evitare spam)*
- ❌ È impossibile richiedere più volte lo stesso brano
- ✔️ Notifiche eleganti tramite **toast**, sia in caso di successo che di errore
- 🔄 Repertorio che **si aggiorna automaticamente** quando gli admin cambiano la fase dell’evento
- ℹ️ Pagine aggiuntive:
  - **About**
  - **Contact** (bio e contatti della band)

---

## 🔗 Connessione al Backend

Il frontend guest comunica con il backend deployato su Koyeb:

https://rich-sheelagh-amedeomignano-0e8df352.koyeb.app/


Tutte le chiamate API sono gestite tramite **axios**.  
La comunicazione in tempo reale avviene tramite **WebSocket + STOMP + SockJS**.

---

## 🚀 Come avviare il progetto

npm install     # installa tutte le dipendenze
npm run dev     # avvia il progetto in modalità sviluppo


Il progetto utilizza Vite e parte di default su:

http://localhost:5174

---

## 🌍 Deploy/Demo
https://banda-corta-jukebox.vercel.app/

---

## 💿 Screenshot

<img width="752" height="759" alt="Schermata 2025-11-13 alle 22 13 47" src="https://github.com/user-attachments/assets/a05a3e1e-6d2e-49b2-8480-739923be25e0" />


![Video](https://github.com/user-attachments/assets/5147779c-25a6-4bb2-a68e-16ccb950203f)


