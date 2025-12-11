🏸 Badminton Court Booking System
Full-Stack Intern Assignment — Acorn Globus

This project is built as part of the Full-Stack Developer Internship Assignment.
It is a complete end-to-end booking platform enabling users to book courts, equipment, and coaches while supporting dynamic pricing rules controlled by the admin.

🚀 Live Demo Links
Service	URL
Frontend (Vercel)	https://badminton-court-booking-system-i6s748cc3-pavana-k-vs-projects.vercel.app/

Backend (Render)	https://badminton-court-booking-system-1-mjhk.onrender.com/

GitHub Repository	https://github.com/Pavanakv/Badminton-Court-Booking-System


📌 Project Overview

This platform allows users to book:

✔️ A badminton court

✔️ Optional equipment (rackets, shoes)

✔️ Optional coach

✔️ Dynamic price calculation based on configurable rules

The admin panel provides:

Manage courts

Manage equipment

Manage coaches

Manage pricing rules (peak hours, weekend surcharge, indoor premium, etc.)

View & manage all bookings

🎯 Key Features (Matches Assignment Requirements)
🟦 User-Side

Select court, equipment, coach

Choose date and timeslots

Live price preview (auto-updates on user selections)

Prevents double-booking of courts / coaches / equipment

View booking history

Cancel bookings

🟪 Admin-Side

Manage all resources

Configure pricing rules dynamically

View all bookings

Clean, responsive UI with sidebar-based admin layout

🟨 Dynamic Pricing Engine

Pricing is influenced by:

Peak hours

Weekend surcharge

Indoor court premium

Equipment fees

Coach hourly fee

Rules are stored in DB, not hardcoded.

🟥 Multi-Resource Atomic Booking

Booking succeeds only if:

Court is free

Coach is free

Equipment quantity available
Else: booking is rejected.

🛠️ Tech Stack
Frontend

React.js

Tailwind CSS

Axios

Backend

Node.js

Express.js

MongoDB + Mongoose

Deployment

Frontend → Vercel

Backend → Render

📁 Project Structure
/backend
  /models
  /routes
  /controllers
  /utils
  server.js

/frontend
  /src
    /components
    /pages
    /services
  App.js
  index.js

⚙️ Environment Variables
Backend (.env)
PORT=5000
MONGODB_URI=mongodb+srv://pavanakv557:Pavanakv_0911@dreamnestcluster.t6bsy.mongodb.net/?appName=DreamNestCluster
FRONTEND_URL=https://badminton-court-booking-system-gg0jph1bc-pavana-k-vs-projects.vercel.app

Frontend (.env)
REACT_APP_API_URL=https://badminton-court-booking-system-1-mjhk.onrender.com/

🔧 Local Setup Instructions
1. Clone Repo
git clone https://github.com/Pavanakv/Badminton-Court-Booking-System

2. Backend Setup
cd backend
npm install
npm run dev


Backend runs at: http://localhost:5000

3. Frontend Setup
cd frontend
npm install
npm start


Frontend runs at: http://localhost:3000

🌱 Seed Data (Courts, Equipment, Coaches, Pricing Rules)

To make the system usable immediately, seed data includes:

2 Indoor Courts, 2 Outdoor Courts

Rackets (10 qty), Shoes (10 qty)

3 Coaches with hourly price

Pricing Rules:

Peak Hours (6–9 PM) multiplier

Indoor premium

Weekend surcharge

🧠 Pricing Engine — Architecture Summary (300–500 words)

The pricing engine is designed to be fully dynamic, meaning all pricing logic is configured through the database rather than hardcoded. Each rule stored in the database contains a type (surcharge or multiplier), its conditions (time range, day of week, court type), and its value.

When the user selects a court, date, and timeslot, the frontend calls:

POST /pricing/preview


The backend loads all active rules and evaluates them:

If booking is on a weekend, weekend rule applies.

If the time falls within peak hours, peak multiplier applies.

If user chooses an indoor court, indoor surcharge applies.

Equipment and coach fees are added on top.

The engine produces a transparent breakdown:

{
  basePrice,
  peakFee,
  weekendFee,
  indoorFee,
  equipmentFee,
  coachFee,
  total
}


This gives users real-time pricing feedback before placing the booking.

For availability, the backend checks:

Court Availability: No overlapping booking for the same court

Coach Availability: A coach cannot handle two sessions at the same time

Equipment Availability: Ensures requested quantity ≤ available quantity

A booking succeeds only if all three resources are simultaneously free.
Otherwise, the booking is rejected, ensuring atomic multi-resource scheduling.

This modular architecture cleanly separates pricing, availability, and booking logic, making the system scalable and easy to maintain.

🧪 Testing Instructions (for reviewers)

Open the frontend live link

Try selecting different timeslots and options

Observe live pricing updates

Confirm booking

Go to Booking History → cancel the booking

Open Admin Dashboard

Add/Edit courts, equipment, coaches, rules

Navigate to All Bookings to verify updates

📌 Known Limitations (Expected for Assignment)

No authentication layer

Basic concurrency handling (sufficient for assignment)

Limited UI animations

📞 Contact

If you have any issues reviewing the project, feel free to reach out:

Name: Pavana K.V
Email: pavanakv557@gmail.com
