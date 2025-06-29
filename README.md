# IPO Administration Dashboard

A comprehensive IPO (Initial Public Offering) administration dashboard application built with Django REST Framework backend and modern HTML/CSS/JavaScript frontend. The application provides three primary sections for managing IPO data, monitoring upcoming offerings, and registering new IPO details.

## 🚀 Features

### Three Primary Sections

1. **IPO Admin Dashboard**
   - Real-time IPO statistics and metrics
   - Interactive charts showing IPO performance
   - Quick links to major financial platforms
   - Overview of profitable vs loss-making IPOs

2. **IPO Upcoming Screen**
   - Comprehensive table view of all IPOs
   - Advanced filtering by status, date range, and company
   - Real-time search functionality
   - Pagination for large datasets
   - Action buttons for update, delete, and view operations

3. **Register IPO Details**
   - Comprehensive IPO registration form
   - Company logo upload functionality
   - Price band and issue size management
   - Listing details and performance tracking
   - Subscription data management

### Technical Features

- ✅ RESTful API endpoints with Django REST Framework
- ✅ PostgreSQL database with optimized queries
- ✅ Responsive design with Bootstrap 5
- ✅ Interactive charts with Chart.js
- ✅ Real-time data updates
- ✅ Advanced filtering and search
- ✅ File upload support for company logos
- ✅ Comprehensive form validation
- ✅ CSRF protection and security measures

## 🛠 Tech Stack

### Backend

- **Python**: 3.12.3
- **Django**: 5.0.6
- **Django REST Framework**: 3.15.1
- **Database**: PostgreSQL
- **Image Processing**: Pillow

### Frontend
- **HTML5** with semantic markup
- **CSS3** with custom properties and animations
- **JavaScript** (ES6+) with async/await
- **Bootstrap 5** (via CDN)
- **Chart.js** for interactive charts
- **Font Awesome** for icons

## 📁 Project Structure

\`\`\`
ipo-admin-dashboard/
├── ipo_admin/                 # Django project settings
│   ├── *init*.py
│   ├── settings.py           # Main configuration
│   ├── urls.py              # URL routing
│   └── wsgi.py              # WSGI configuration
├── ipo_management/          # IPO management Django app
│   ├── models.py            # Company, IPO, Document, News models
│   ├── serializers.py       # DRF serializers
│   ├── views.py             # API views and endpoints
│   ├── urls.py              # App URLs
│   └── admin.py             # Admin configuration
├── templates/               # HTML templates
│   └── index.html           # Main SPA template
├── static/                  # Static files
│   ├── css/
│   │   └── style.css        # Custom styles
│   └── js/
│       └── app.js           # Frontend JavaScript
├── media/                   # User uploaded files
│   ├── company_logos/       # Company logo uploads
│   └── ipo_documents/       # IPO document uploads
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
cd ipo-admin-dashboard

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

## Install dependencies
pip install -r requirements.txt
\`\`\`

### 3. Database Configuration

1. Create PostgreSQL database:
\`\`\`sql
CREATE DATABASE ipo_admin_db;
CREATE USER ipo_admin_user WITH PASSWORD 'secure_password_123';
GRANT ALL PRIVILEGES ON DATABASE ipo_admin_db TO ipo_admin_user;
\`\`\`

2. Update database settings in \`ipo_admin/settings.py\` if needed.

### 4. Django Setup
\`\`\`bash
# Run migrations
python manage.py makemigrations
python manage.py migrate

## Create superuser
python manage.py createsuperuser

### Load sample data (optional)
python manage.py shell
>>> exec(open('scripts/seed_data.py').read())
\`\`\`

### 5. Run Development Server
\`\`\`bash
python manage.py runserver
\`\`\`

Visit \`http://127.0.0.1:8000\` to access the application.

## 🔗 API Endpoints

### IPO Management
- \`GET /api/ipos/\` - List all IPOs with pagination and filtering
- \`POST /api/ipos/\` - Create a new IPO
- \`GET /api/ipos/{id}/\` - Retrieve specific IPO details
- \`PUT /api/ipos/{id}/\` - Update IPO information
- \`DELETE /api/ipos/{id}/\` - Delete IPO
- \`PATCH /api/ipos/{id}/update_status/\` - Update IPO status

### IPO Categories
- \`GET /api/ipos/upcoming/\` - Get upcoming IPOs
- \`GET /api/ipos/ongoing/\` - Get ongoing IPOs
- \`GET /api/ipos/new_listed/\` - Get newly listed IPOs

### Company Management
- \`GET /api/companies/\` - List all companies
- \`POST /api/companies/\` - Create new company
- \`GET /api/companies/{id}/\` - Get company details
- \`PUT /api/companies/{id}/\` - Update company information

### Dashboard & Analytics
- \`GET /api/dashboard-stats/\` - Get dashboard statistics
- \`GET /api/quick-links/\` - Get quick links for financial platforms

### Documents & News
- \`GET /api/documents/\` - List IPO documents
- \`POST /api/documents/\` - Upload IPO document
- \`GET /api/news/\` - List IPO news
- \`POST /api/news/\` - Create IPO news

## 📊 Data Models

### Company Model

- Company information (name, logo, sector, website)
- Company description and metadata
- Timestamps for tracking

### IPO Model

- Complete IPO information (price band, dates, issue size)
- Status tracking (upcoming, ongoing, new_listed, closed)
- Financial data (market cap, PE ratio, subscription details)
- Performance metrics (listing gain/loss, current price)

### IPO Document Model
- Document management for IPO-related files
- Support for prospectus, application forms, etc.
- File upload and categorization

### IPO News Model

- News and updates related to IPOs
- Source tracking and publication dates
- Content management

## 🎨 UI/UX Features

### Dashboard Design

- **Modern Sidebar Navigation** with collapsible menu
- **Interactive Statistics Cards** with animated counters
- **Doughnut Charts** for visual data representation
- **Quick Links Panel** for external financial platforms

### IPO Management Interface
- **Advanced Data Table** with sorting and filtering
- **Status Badges** with color-coded indicators
- **Action Buttons** for CRUD operations
- **Responsive Pagination** for large datasets

### Registration Form

- **Multi-tab Interface** for organized data entry
- **Real-time Validation** with error messaging
- **File Upload Support** for company logos
- **Auto-calculation** of derived fields

## 🔒 Security Features

### Backend Security

- CSRF protection on all forms
- SQL injection prevention with ORM
- File upload validation and sanitization
- Permission-based access control

### Frontend Security
- Input sanitization and validation
- XSS protection measures
- Secure file handling
- API endpoint protection

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (Collapsible sidebar, stacked layout)
- **Tablet**: 768px - 1024px (Optimized spacing)
- **Desktop**: > 1024px (Full layout with sidebar)

### Mobile Features

- Touch-friendly navigation
- Optimized table scrolling
- Responsive charts and graphs
- Mobile-first form design

## 🧪 Testing with Postman

### Sample API Requests

#### Create IPO
\`\`\`json
POST /api/ipos/
{
  "company": 1,
  "price_band_min": 100.00,
  "price_band_max": 120.00,
  "open_date": "2024-07-01",
  "close_date": "2024-07-03",
  "issue_size": 1000.00,
  "issue_type": "book_built",
  "status": "upcoming",
  "lot_size": 100,
  "face_value": 10.00
}
\`\`\`

#### Get Dashboard Stats
\`\`\`
GET /api/dashboard-stats/
\`\`\`

#### Filter IPOs
\`\`\`
GET /api/ipos/?status=upcoming&search=Adani
\`\`\`

## 🚀 Deployment

### Production Checklist

1. Set \`DEBUG = False\` in settings
2. Configure proper database credentials
3. Set up static file serving (WhiteNoise/Nginx)
4. Configure media file handling
5. Set up HTTPS and security headers
6. Configure environment variables
7. Set up logging and monitoring

### Environment Variables
\`\`\`bash
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:pass@localhost/dbname
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
\`\`\`

## 🔧 Development

### Adding New Features

1. Update models in \`ipo_management/models.py\`
2. Create and run migrations
3. Update serializers in \`ipo_management/serializers.py\`
4. Add API endpoints in \`ipo_management/views.py\`
5. Update frontend JavaScript in \`static/js/app.js\`
6. Add corresponding CSS styles

### Code Style Guidelines
- Follow PEP 8 for Python code
- Use meaningful variable names
- Add docstrings for functions and classes
- Keep functions small and focused
- Use consistent indentation (4 spaces)
- Comment complex business logic

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check PostgreSQL service is running
   - Verify database credentials in settings
   - Ensure database exists

2. **Static Files Not Loading**
   - Run \`python manage.py collectstatic\`
   - Check STATIC_URL and STATICFILES_DIRS settings
   - Verify file paths in templates

3. **File Upload Issues**
   - Check MEDIA_URL and MEDIA_ROOT settings
   - Verify directory permissions
   - Ensure Pillow is installed for image processing

4. **Chart Not Displaying**
   - Check Chart.js CDN link
   - Verify canvas element exists
   - Check browser console for JavaScript errors

## 📈 Performance Optimization

### Database Optimization
- Use \`select_related()\` for foreign key queries
- Implement database indexing for frequently queried fields
- Use pagination for large datasets
- Optimize query patterns

### Frontend Optimization
- Lazy loading for images and charts
- Debounced search inputs
- Efficient DOM manipulation
- Minified CSS and JavaScript in production

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the troubleshooting section

---

**IPO Administration Dashboard** - Built with ❤️ using Django REST Framework and modern web technologies.
