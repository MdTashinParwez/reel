# 🎬 ReelDrop – Video Reels Platform

***ReelDrop*** is a modern short-video platform built with ***Next.js***, ***TypeScript***, ***Tailwind CSS***, ***MongoDB***, and ***ImageKit*** for seamless ***cloud-based*** media handling.

It enables users to ***register***, ***upload***, and ***watch*** ***vertical*** ***videos*** in a smooth, scroll-based experience. The platform features an instant upload flow, where videos are uploaded effortlessly with a single action, providing a fast and responsive content-sharing experience.

Designed with a focus on ***performance***, ***simplicity***, and ***user*** ***experience***, ReelDrop delivers a clean interface, real-time upload feedback, and a mobile-friendly viewing format optimized for short-form video consumption.

## 🔗 Live Demo :
-  https://reeldrop-beryl.vercel.app/
-  <img width="1791" height="780" alt="image" src="https://github.com/user-attachments/assets/596591c1-2f2d-484c-b076-0a4d99380173" />

  

---

## 🔹 Features

### **User Authentication**
- Register & Login system using **NextAuth.js**  
- JWT-based sessions with secure user identification  

### **Video Upload**
- Upload videos with title, description, thumbnail, and auto quality detection  
- Upload progress tracking  

### **Video Feed**
- Vertical scrollable Reels-like feed  
- One video per screen with **9:16 aspect ratio**  

### **Professional UI**
- Responsive and modern design with Tailwind CSS  
- Cards, shadows, hover effects for video components  

### **Notifications**
- Toast notifications for success, errors, and info messages  

### **Admin Dashboard**
- Upload videos after login  
- Simple and intuitive account dropdown  



## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Backend | Next.js API Routes, Node.js, TypeScript |
| Database | MongoDB with Mongoose |
| Storage | ImageKit (Cloud Video Storage) |
| Authentication | NextAuth.js (JWT-based) |
| Icons & UI | Lucide React, DaisyUI |

---

## ⚙ Installation

### **Clone the repository**
```bash
git clone https://github.com/MdTashinParwez/reel
cd reeldrop
```

### Install dependencies
```bash
npm install
# or
yarn install
```
### Create a .env file:
```bash
MONGODB_URI=<your_mongodb_connection_string>
NEXTAUTH_SECRET=<your_nextauth_secret>
IMAGEKIT_PUBLIC_KEY=<your_imagekit_public_key>
IMAGEKIT_PRIVATE_KEY=<your_imagekit_private_key>
IMAGEKIT_URL_ENDPOINT=<your_imagekit_url_endpoint>
```
### Run the development server:
```bash
npm run dev
# or
yarn dev
```
## Usage
### Home Page
- Shows video feed like Instagram Reels.
- Scroll down to see next videos.
- Each video is 9:16 aspect ratio.
### Authentication
- Click Login/Register on the header to sign in.
- After login, you can upload videos.
### Upload Video
- Navigate to Video Upload in account dropdown.
- Enter title, description, select video → click Publish.
- Upload progress is visible.
### Notifications
- Shows toast messages on success or errors.

## 💡 Future Improvements
- Likes and comments on videos.
- Infinite scroll with lazy loading.
- Video search and filter.
- Admin dashboard for managing videos and users.
- Dark mode toggle for user experience.

##🔗 Live Demo :
-  https://reeldrop-beryl.vercel.app/
  
