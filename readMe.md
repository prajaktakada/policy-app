pm2 start server.js --name "policy-app"
pm2 logs

# Policy App (Node.js + MongoDB + Worker Threads)

Featurs of app
- Upload policy data via CSV/XLSX file (background processing using Worker Threads)
- Store data in multiple MongoDB collections:
  - User
  - Agent
  - Account
  - Carrier
  - LOB (Line of Business)
  - Policy
- Search policy info by user’s first name
- Aggregate policies per user
- Schedule a message to be inserted in DB at a specific date & time
- Monitor CPU usage and auto-restart the server on high load (ith PM2)

to run this local
git clone https://github.com/prajaktakada/policy-app.git
cd policy-app
npm install
