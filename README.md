# NDACYAYISABA Lambert Portfolio

A professional portfolio website showcasing the work of NDACYAYISABA Lambert, an AI Specialist, Applied Mathematician, and Software Engineer from Rwanda.

## 🚀 Features

- **Modern Design**: Responsive, professional UI built with Bootstrap 5
- **Dynamic Content**: Django-powered backend with database models for projects, blog, and resume
- **AI Integration**: Interactive showcases of AI projects including YOLO basketball analysis and EduTech+
- **Mobile App**: Flutter-based mobile companion app
- **SEO Optimized**: Meta tags, OpenGraph, and Google Analytics integration
- **Secure & Scalable**: Production-ready with PostgreSQL, security best practices, and deployment configs

## 🛠️ Tech Stack

- **Backend**: Django 4.2 (Python)
- **Frontend**: HTML5, CSS3, Bootstrap 5, JavaScript
- **Database**: PostgreSQL (Production) / SQLite (Development)
- **Mobile**: Flutter (Dart)
- **Deployment**: Heroku/Railway with Gunicorn
- **AI/ML**: TensorFlow, PyTorch, OpenCV

## 📋 Prerequisites

- Python 3.8+
- PostgreSQL (for production)
- Node.js (for frontend assets)
- Flutter SDK (for mobile app)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Lambert-01/portfolio.git
   cd portfolio
   ```

2. **Set up virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

5. **Database setup**
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```

6. **Run development server**
   ```bash
   python manage.py runserver
   ```

7. **Mobile app setup**
   ```bash
   cd my_app
   flutter pub get
   flutter run
   ```

## 📁 Project Structure

```
portfolio/
├── portfolio/          # Main Django app
│   ├── models.py       # Database models
│   ├── views.py        # View logic
│   ├── urls.py         # URL routing
│   └── ...
├── templates/          # HTML templates
├── static/             # CSS, JS, images
├── my_app/             # Flutter mobile app
└── requirements.txt    # Python dependencies
```

## 🎯 Key Sections

- **Home**: Hero section with featured projects
- **About**: Personal bio, skills, education
- **Projects**: Showcase of AI and software projects
- **Blog**: Technical articles and insights
- **Resume**: Downloadable CV and experience
- **Contact**: Contact form with email integration

## 🤖 AI Integration

- **EduTech+**: Personalized e-learning platform with ML algorithms
- **Basketball Analysis**: YOLO-based court line detection
- **Monkeypox Modeling**: Predictive epidemiological models
- **Interactive Demos**: Embedded AI tools and visualizations

## 📱 Mobile App

The Flutter app provides:
- Portfolio overview
- Project galleries
- Contact integration
- Offline capabilities

## 🔒 Security

- Environment-based secrets management
- CSRF protection
- SQL injection prevention
- Secure file uploads
- HTTPS enforcement in production

## 🚀 Deployment

### Heroku
```bash
heroku create your-app-name
heroku config:set SECRET_KEY=your-secret
heroku config:set DEBUG=False
heroku config:set DB_NAME=your-db
# ... other env vars
git push heroku main
```

### Railway
- Connect GitHub repo
- Set environment variables
- Deploy automatically

## 📊 Analytics & SEO

- Google Analytics integration
- OpenGraph meta tags
- Structured data (JSON-LD)
- Sitemap generation
- Performance monitoring

## 📝 Development

### Adding New Projects
1. Go to Django Admin
2. Add new Project instance
3. Upload images to media/projects/
4. Set featured=True for homepage display

### Blog Management
1. Create BlogPost in admin
2. Use TinyMCE for rich content
3. Set published=True to display

## 🧪 Testing

```bash
python manage.py test
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**NDACYAYISABA Lambert**
- AI Specialist & Applied Mathematician
- Email: nlambert833@gmail.com
- LinkedIn: [Profile](https://www.linkedin.com/in/ndacyayisaba-lambert-66625b231/)
- GitHub: [Lambert-01](https://github.com/Lambert-01)

## 🙏 Acknowledgments

- Bootstrap for UI framework
- Django for backend
- Flutter for mobile
- OpenAI for AI inspiration

---

*Built with ❤️ in Rwanda*