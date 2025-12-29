# 🛡️ AI Surveillance Dashboard (Demo & Guide)

![alt text](<public/main.png>)

WEBSITE LINK-https://user-activity-monitoring-system.vercel.app


> ⚠️ **Important Notice**  
> This repository contains a **demo and guided walkthrough** of an AI Surveillance Dashboard.  
> The **actual production dashboard, live monitoring data, and internal APIs are intentionally not shared** for security and privacy reasons.

---

## 📌 Project Overview

The **AI Surveillance Dashboard** is a security-focused monitoring system designed to track sessions, activity signals, and system messages in a controlled and privacy-aware manner.

This project demonstrates:
- Secure frontend architecture
- Defensive backend message delivery logic
- Session-aware user handling
- Professional onboarding / tutorial UX for sensitive systems

Instead of exposing real monitoring tools, this repo provides a **guided visual walkthrough** explaining how the dashboard works.

---

## 🎯 Why This Demo Exists (Security First)

The real dashboard includes:
- Live monitoring signals
- User/session scoped data
- Admin-level controls

Exposing such functionality publicly would be unsafe.

Therefore:
- ✅ A **static dashboard preview** is used
- ✅ A **step-by-step tutorial overlay** explains each feature
- ❌ No real data is exposed
- ❌ No live feeds are accessible

This mirrors how **enterprise and security products** are documented publicly.

---

## 🧠 Key Features Demonstrated

### 1️⃣ Anonymous & Authenticated Sessions
- Users can be tracked anonymously via a generated session ID
- Logged-in users are identified securely using JWT
- No personal identity is leaked

---

### 2️⃣ Message Delivery Logic
The system supports three types of messages:

| Type | Description |
|---|---|
| Global | Visible to all users (system alerts) |
| User-specific | Visible only to a targeted logged-in user |
| Session-specific | Visible only to a specific anonymous session |

Defensive backend logic ensures messages **never leak** to unintended users.

---

### 3️⃣ Activity Map (Conceptual)
- The dashboard includes a map-style visualization
- It represents **approximate activity regions**
- Exact locations are **never stored or shown**

This is demonstrated visually in the guide without exposing real tracking.

---

### 4️⃣ Admin Controls (Conceptual)
The real system supports:
- Triggering capture actions
- Reviewing activity logs
- Sending targeted messages

These are **explained in the guide**, but not made accessible.

---

## 📘 Dashboard Guide / Tutorial

Instead of the real dashboard, the project includes a **guided walkthrough**:

- Full-screen static preview of the dashboard
- Step-by-step explanations
- Highlighted UI regions
- Moving security disclaimer
- Responsive and cross-browser safe layout

The guide is opened from the landing screen using: