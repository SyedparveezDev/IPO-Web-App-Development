# BLUESTOCK Authentication System

A complete three-section authentication web application built with Django REST Framework backend and vanilla HTML/CSS/JavaScript frontend, featuring login, registration, and password reset functionality.

## 🚀 Features

### Authentication Sections
1. **Login Section**
   - Email and password authentication
   - "Remember me" functionality
   - reCAPTCHA integration
   - Google Sign-in option (placeholder)
   - Forgot password link

2. **Registration Section**
   - User registration with email verification
   - Password strength validation
   - Terms of service agreement
   - reCAPTCHA integration
   - Google Sign-up option (placeholder)

3. **Password Reset Section**
   - Email-based password reset
   - Secure token generation
   - Email notification system

### Technical Features
- ✅ Responsive design with Bootstrap 5
- ✅ Real-time form validation
- ✅ CSRF protection
- ✅ Session management
- ✅ RESTful API endpoints
- ✅ PostgreSQL database integration
- ✅ Custom user model
- ✅ Password security validation
- ✅ Email backend configuration
- ✅ CORS handling for API calls

## 🛠 Tech Stack

### Backend
- **Python**: 3.12.3
- **Django**: 5.0.6
- **Django REST Framework**: 3.15.1
- **Database**: PostgreSQL
- **Authentication**: Django's built-in auth system

### Frontend
- **HTML5** with semantic markup
- **CSS3** with custom properties and animations
- **JavaScript** (ES6+) with async/await
- **Bootstrap 5** (via CDN)
- **Font Awesome** (for icons)
- **Google reCAPTCHA** integration

## 📁 Project Structure

\`\`\`
bluestock-auth-app/
├── bluestock/                 # Django project settings
│   ├── __init__.py
│   ├── settings.py           # Main configuration
│   ├── urls.py              # URL routing
│   └── wsgi.py              # WSGI configuration
├── authentication/          # Authentication Django app
│   ├── models.py            # User and PasswordResetToken models
│   ├── serializers.py       # DRF serializers
│   ├── views.py             # API views
│   ├── urls.py              # App URLs
│   └── admin.py             # Admin configuration
├── templates/               # HTML templates
│   └── index.html           # Main SPA template
├── static/                  # Static files
│   ├── css/
│   │   └── style.css        # Custom styles
│   ├── js/
│   │   └── app.js           # Frontend JavaScript
│   └── images/
│       └── logo.png         # BLUESTOCK logo
├── scripts/                 # Database scripts
│   ├── setup_database.sql   # Database setup
│   └── seed_data.sql        # Sample data
├── requirements.txt         # Python dependencies
└── manage.py               # Django management script
\`\`\`

## 🚀 Setup Instructions

### 1. Prerequisites
- Python 3.12.3
- PostgreSQL
- Git

### 2. Clone and Setup
\`\`\`bash
git clone <repository-url>
cd bluestock-auth-app

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
\`\`\`

### 3. Database Configuration
1. Create PostgreSQL database:
\`\`\`sql
CREATE DATABASE bluestock_db;
CREATE USER bluestock_user WITH PASSWORD 'secure_password_123';
GRANT ALL PRIVILEGES ON DATABASE bluestock_db TO bluestock_user;
\`\`\`

2. Update database settings in \`bluestock/settings.py\` if needed.

### 4. Django Setup
\`\`\`bash
# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Collect static files (if needed)
python manage.py collectstatic
\`\`\`

### 5. Run Development Server
\`\`\`bash
python manage.py runserver
\`\`\`

Visit \`http://127.0.0.1:8000\` to access the application.

## 🔗 API Endpoints

### Authentication Endpoints
- \`POST /api/auth/register/\` - User registration
- \`POST /api/auth/login/\` - User login
- \`POST /api/auth/logout/\` - User logout
- \`POST /api/auth/forgot-password/\` - Password reset request
- \`GET /api/auth/profile/\` - Get user profile
- \`GET /api/auth/check-auth/\` - Check authentication status

### Request/Response Examples

#### Registration
\`\`\`json
POST /api/auth/register/
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "password_confirm": "securepassword123"
}
\`\`\`

#### Login
\`\`\`json
POST /api/auth/login/
{
  "email": "john@example.com",
  "password": "securepassword123",
  "remember_me": true
}
\`\`\`

#### Password Reset
\`\`\`json
POST /api/auth/forgot-password/
{
  "remember_me": true
}
\`\`\`

#### Password Reset
\`\`\`json
POST /api/auth/forgot-password/
{
  "email": "john@example.com"
}
\`\`\`

## 🧪 Testing with Postman

### Import Collection
Create a new Postman collection with the following requests:

1. **Register User**
   - Method: POST
   - URL: `http://127.0.0.1:8000/api/auth/register/`
   - Body: JSON with user registration data

2. **Login User**
   - Method: POST
   - URL: `http://127.0.0.1:8000/api/auth/login/`
   - Body: JSON with login credentials

3. **Check Auth Status**
   - Method: GET
   - URL: `http://127.0.0.1:8000/api/auth/check-auth/`

4. **Forgot Password**
   - Method: POST
   - URL: `http://127.0.0.1:8000/api/auth/forgot-password/`
   - Body: JSON with email

5. **User Profile**
   - Method: GET
   - URL: `http://127.0.0.1:8000/api/auth/profile/`
   - Headers: Include session cookies

## 🎨 Design Features

### Visual Elements
- **BLUESTOCK Branding**: Custom logo integration
- **Purple Theme**: Consistent color scheme matching the design
- **Responsive Layout**: Mobile-first design approach
- **Smooth Animations**: CSS transitions and keyframe animations
- **Modern UI**: Clean, professional interface

### User Experience
- **Real-time Validation**: Instant feedback on form inputs
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Comprehensive error messages
- **Accessibility**: ARIA labels and keyboard navigation
- **Progressive Enhancement**: Works without JavaScript

## 🔒 Security Features

### Backend Security
- CSRF protection on all forms
- Password validation and hashing
- Session-based authentication
- SQL injection prevention
- XSS protection

### Frontend Security
- Input sanitization
- reCAPTCHA integration
- Secure password handling
- HTTPS enforcement (production)

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: > 768px

## 🚀 Deployment

### Production Checklist
1. Set `DEBUG = False` in settings
2. Configure proper database credentials
3. Set up static file serving
4. Configure email backend (SMTP)
5. Set up HTTPS
6. Configure environment variables
7. Set up proper CORS settings
8. Configure reCAPTCHA keys

### Environment Variables
\`\`\`bash
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:pass@localhost/dbname
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
RECAPTCHA_SITE_KEY=your-site-key
RECAPTCHA_SECRET_KEY=your-secret-key
\`\`\`

## 🔧 Development

### Adding New Features
1. Update models in `authentication/models.py`
2. Create and run migrations
3. Update serializers in `authentication/serializers.py`
4. Add API endpoints in `authentication/views.py`
5. Update frontend JavaScript in `static/js/app.js`
6. Add corresponding CSS styles

### Code Style Guidelines
- Follow PEP 8 for Python code
- Use meaningful variable names
- Add docstrings for functions
- Keep functions small and focused
- Use consistent indentation (4 spaces)

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check PostgreSQL is running
   - Verify database credentials
   - Ensure database exists

2. **Static Files Not Loading**
   - Run `python manage.py collectstatic`
   - Check STATIC_URL settings
   - Verify file paths

3. **reCAPTCHA Not Working**
   - Check site key configuration
   - Verify domain settings
   - Test with localhost keys

4. **Email Not Sending**
   - Check email backend configuration
   - Verify SMTP settings
   - Test with console backend for development

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the troubleshooting section

---

**BLUESTOCK Authentication System** - Built with ❤️ using Django and modern web technologies.
