from .models import Project, BlogPost, Resume

def site_info(request):
    return {
        'featured_projects': Project.objects.filter(featured=True)[:3],
        'recent_posts': BlogPost.objects.filter(published=True).order_by('-created_at')[:3],
        'resume': Resume.objects.first(),
        'site_name': 'NDACYAYISABA Lambert Portfolio',
        'site_description': 'AI Specialist, Applied Mathematician, and Software Engineer',
    }