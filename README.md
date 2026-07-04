# SkillWise Recruit - Resume Parser & Skill Matching System

A full-stack recruitment automation system that parses resumes, extracts skills, and provides intelligent job recommendations and career path suggestions using AI-powered analysis.

---

## 🚀 Features

- **Resume Parsing**: Extracts text from PDF resumes using pdfplumber
- **Skill Extraction**: Identifies technical skills from resume content
- **Skill Categorization**: Groups skills into categories (Programming, Web Development, Data Analysis)
- **Job Recommendations**: Suggests relevant job roles based on extracted skills
- **Career Path Suggestions**: Provides career progression guidance (Entry-Level to Senior)
- **User Authentication**: Secure login/signup system with password hashing
- **Admin Dashboard**: Admin panel for user management and resume processing
- **Bulk Resume Processing**: Process up to 15 resumes simultaneously
- **PDF Report Generation**: Download analysis results as formatted PDF reports
- **Database Integration**: MySQL database for user and resume data storage

---

## 🏗️ Architecture

**Tech Stack Overview:**
- Backend: Flask (REST API)
- Database: MySQL
- PDF Processing: pdfplumber, pdfminer
- Data Analysis: pandas
- PDF Generation: ReportLab
- Security: werkzeug (password hashing)
- Frontend: HTML/CSS/JavaScript with Bootstrap

### System Design

The system follows a two-layer architecture with internal data flow and external user interactions:

**Data Flow:**
```
FrontEnd → Backend → Resume Analysis → Job Matching → MySQL
                    ↓                    ↓
              Skill Data          Job Matches
```

**External Interaction:**
```
User → Upload Resumes → MySQL → Admin → Retrieve Resumes → Analysis
```

**Description:**
- **FrontEnd**: User interface for resume upload and result display
- **Backend**: Flask API that processes requests and coordinates data flow
- **Resume Analysis**: PDF parsing and skill extraction module
- **Job Matching**: Intelligent job recommendation engine based on extracted skills
- **MySQL**: Central database storing user data, resumes, and analysis results
- **User**: Uploads resumes and views analysis results
- **Admin**: Manages users and processes resumes for analysis

---

## 📂 Project Structure

```
SkillWiseRecruit/
├── app.py                          # Main Flask application
├── requirements.txt                # Python dependencies
├── MYSQL Local.session.sql         # Database schema
├── templates/                      # HTML templates
│   ├── index.html                  # Admin dashboard
│   ├── login.html                  # User login
│   ├── signup.html                 # User registration
│   ├── admin-login.html            # Admin login
│   ├── client-uploads.html         # Resume upload form
│   ├── results.html                # Analysis results display
│   ├── admin_users.html            # User management
│   └── edit_user.html              # User edit form
├── static/                         # Static assets (CSS, JS)
└── static/uploads/                 # Resume upload directory
```

---

## ▶️ How to Run

### Prerequisites
- Python 3.8+
- MySQL Server
- pip package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd SkillWiseRecruit
```

2. **Install Python dependencies**
```bash
pip install -r requirements.txt
```

3. **Setup MySQL Database**
```sql
CREATE DATABASE resume;
-- Import MYSQL Local.session.sql for schema
```

4. **Configure Database Connection**
Edit `app.py` lines 35-40:
```python
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="your_password",
    database="resume"
)
```

5. **Run Application**
```bash
python app.py
```

Access at `http://localhost:5000`

---

## 🧠 Key Concepts Demonstrated

- **PDF Parsing**: Extract text from PDF documents using pdfplumber
- **Natural Language Processing**: Skill extraction using regex pattern matching
- **Data Analysis**: Pandas for structured data processing
- **Machine Learning**: Rule-based job recommendation engine
- **Web Development**: Flask backend with RESTful API design
- **Database Management**: MySQL with user authentication and data storage
- **Security**: Password hashing and session management
- **Report Generation**: Dynamic PDF creation with ReportLab

---

## 📊 Skill Recognition System

### Supported Skills
- **Programming**: Python, Java, JavaScript, SQL, C++
- **Web Development**: HTML, CSS, React, Node.js
- **Data Analysis**: Data Analysis, Machine Learning

### Job Mapping
- Python → Python Developer, Data Scientist, Software Developer
- Java → Java Developer, Backend Engineer
- JavaScript → Frontend Developer, Full Stack Developer
- SQL → Database Administrator, Data Analyst
- React → React Developer, Frontend Developer
- Machine Learning → Machine Learning Engineer, AI Engineer

---

## 🔧 Configuration

### Change Maximum Upload Limit
Edit `app.py` line 27:
```python
MAX_UPLOADS = 20  # Change from 15 to 20
```

### Add New Skills
Edit `app.py` line 397:
```python
raw_skills = ['python', 'java', 'javascript', 'sql', 'html', 'css', 'react', 'node.js', 'data analysis', 'machine learning', 'your_new_skill']
```

### Update Job Recommendations
Edit `app.py` lines 297-316:
```python
job_map = {
    'your_skill': ['Job Title 1', 'Job Title 2']
}
```

---

## 📝 API Endpoints

### Authentication
- `GET /` - Redirect to login
- `POST /login` - User login
- `POST /signup` - User registration
- `POST /admin-login` - Admin login
- `GET /logout` - User logout
- `GET /admin-logout` - Admin logout

### User Management
- `GET /client-uploads` - Resume upload form
- `POST /upload` - Process uploaded resumes
- `GET /admin/users` - View all users (admin)
- `POST /admin/users/edit/<id>` - Edit user (admin)
- `POST /admin/users/delete/<id>` - Delete user (admin)

### Resume Processing
- `GET /get_resumes` - Fetch resume list (admin)
- `POST /download_pdf` - Download analysis report as PDF

---

## 🔒 Security Features

- **Password Hashing**: SHA-256 for secure password storage
- **Session Management**: Secure session handling for authentication
- **File Validation**: Extension whitelist (PDF only)
- **Filename Sanitization**: Secure filename handling with werkzeug
- **Authentication Required**: Protected routes for admin and user areas
- **SQL Injection Protection**: Parameterized queries with mysql.connector

---

## 🐛 Troubleshooting

### Database Connection Error
- Verify MySQL server is running
- Check database credentials in app.py
- Ensure database 'resume' exists

### PDF Parsing Errors
- Ensure uploaded files are valid PDFs
- Check if PDF contains extractable text (not scanned images)
- Verify pdfplumber is installed correctly

### Upload Limit Exceeded
- Default limit is 15 files
- Change MAX_UPLOADS in app.py if needed
- Process files in batches if exceeding limit

---

## 📈 Performance Notes

- **Processing Time**: ~2-3 seconds per resume
- **Supported Formats**: PDF only (text-based)
- **Max Upload Size**: 15 files per batch
- **Database**: MySQL for persistent storage
- **Skill Recognition**: Regex-based pattern matching

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- pdfplumber for PDF parsing library
- pandas for data analysis
- ReportLab for PDF generation
- Flask web framework
- MySQL database community

---

## 📞 Contact

For questions or support, please open an issue on GitHub.

---

**Version**: 1.0.0  
**Last Updated**: 2024
