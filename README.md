# DAVISELab Backend

This is the official backend for the [DAVISE Lab](https://www.nitdelhi.ac.in) website at **NIT Delhi**, built using **Node.js** and **Express**. It handles API routes for contact forms, internship applications, lab infrastructure, and research data management.

---

## 🚀 Features

- ✉️ Contact form handling  
- 🎓 Internship application submission & storage  
- 🔬 Research and project data APIs  
- 🏛️ Infrastructure and lab data management  
- 📬 Email notifications (optional setup)  
- 🔐 Input validation and basic security best practices  

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (via Mongoose)
- **dotenv** for environment variables
- **Nodemailer** (optional for emails)
- **CORS**, **Helmet**, and **Morgan** for basic security & logging

---

## 🧪 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/daviselab-backend.git
cd daviselab-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables
Create a .env file in the root folder and add:

```bash
MONGODB_URI=your_mongodb_connection_string_url
PORT=your_port (ex: 5001)
WT_SECRET=your_secret_key (random generated)
SENDER_EMAIL=your_email_through_which_u_want_to_send_mail_to_others
ADMIN_EMAIL=your_admin_email
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret
REFRESH_TOKEN=your_google_refresh_token
```

### 4. Start the Server

```bash
npm run dev
```

## 👨‍🔬 About the Lab
- DAVISE (Data Analysis, Vision and Intelligent Systems Engineering) Lab is a research group under the Department of Computer Science and Engineering, NIT Delhi, focusing on Machine Learning, Computer Vision, and AI-based systems and solutions.

## 🤝 Contributing
- Contributions are welcome! Please fork the repository, make your changes, and submit a pull request. For major updates or feature additions, kindly open an issue first to discuss.

## 🔗 Related Projects
- [DAVISELab Frontend Repository](https://github.com/derwalaman/daviselab-frontened) — Next.js frontend for this backend
