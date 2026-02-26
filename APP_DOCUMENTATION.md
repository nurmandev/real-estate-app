# Omnis - Real Estate Project Documentation

This document provides a comprehensive list of all frontend pages and backend API requests within the Omnis Real Estate application.

---

## 🌐 Frontend Pages (Routes)

The frontend is built with **Next.js (App Router)**. Below are all the accessible routes:

### 🏠 Main Pages
- `/` - Home Page
- `/home-two` - Alternative Home Page
- `/about_us_01` - About Us (Style 01)
- `/about_us_02` - About Us (Style 02)
- `/contact` - Contact Us
- `/faq` - Frequently Asked Questions
- `/pricing_01` - Pricing Plans (Style 01)
- `/pricing_02` - Pricing Plans (Style 02)
- `/compare` - Property Comparison Page

### 🏢 Agency & Agents
- `/agency` - Agency Listing
- `/agency_details` - Agency Detailed View
- `/agent` - Agent Listing
- `/agent_details` - Agent Detailed View

### 📝 Blog
- `/blog_01` - Blog List (Style 01)
- `/blog_02` - Blog List (Style 02)
- `/blog_03` - Blog List (Style 03)
- `/blog_details` - Single Blog Post View

### 🛠️ Services & Projects
- `/service_01` - Services (Style 01)
- `/service_02` - Services (Style 02)
- `/service_details` - Service Detailed View
- `/project_01` - Project List (Style 01)
- `/project_02` - Project List (Style 02)
- `/project_03` - Project List (Style 03)
- `/project_04` - Project List (Style 04)
- `/project_details_01` - Project Detailed View

### 🏡 Property Listings (Various Layouts)
- `/listing_01` to `/listing_17` - Property Search/Listings with different grid and sidebar configurations.
- `/listing_details_01` to `/listing_details_06` - Individual Property Detail pages with various layouts.

### 📊 Dashboard (User/Protected Area)
- `/dashboard/dashboard-index` - User Dashboard Overview
- `/dashboard/profile` - Edit User Profile
- `/dashboard/account-settings` - General Account Settings
- `/dashboard/account-settings/password-change` - Change User Password
- `/dashboard/add-property` - Submit/Add New Property
- `/dashboard/properties-list` - Manage "My Properties"
- `/dashboard/favourites` - Saved/Favourite Properties
- `/dashboard/membership` - Membership/Subscription Details
- `/dashboard/message` - User Messaging Inbox
- `/dashboard/review` - User Reviews Management
- `/dashboard/saved-search` - Saved Search Queries

### ❗ Error Pages
- `/[...not-found]` - Custom 404 Page

---

## 📡 Backend API Requests

These are the API calls made from the frontend and the routes defined in the backend server.

### 🔐 Authentication (Auth Routes)
| Method | Endpoint | Source | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Frontend | Registers a new user account. |
| POST | `/api/auth/login` | Frontend | Authenticates a user and returns a token. |
| POST | `/api/auth/refresh-token`| Backend | Refreshes the authentication token. |
| POST | `/api/auth/logout` | Backend | Logs out the user (Requires Auth). |
| POST | `/api/auth/mfa/setup` | Backend | Initializes Multi-Factor Authentication setup. |
| POST | `/api/auth/mfa/verify`| Backend | Verifies and enables MFA. |

### 👤 Profile Management
| Method | Endpoint | Source | Description |
|--------|----------|--------|-------------|
| GET | `/api/profile` | Frontend | Fetches the current user's profile information. |
| PUT | `/api/profile` | Frontend | Updates the user's profile details. |

### 📧 External Services
- **EmailJS**: Used in `ContactForm.tsx` for sending contact messages directly to email.

---

## 🛠️ Tech Stack Recap
- **Frontend**: Next.js (Tailwind CSS, Axios, Redux Toolkit, React Hook Form, Yup)
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, speakeasy (MFA)
- **Email Service**: EmailJS / Nodemailer
