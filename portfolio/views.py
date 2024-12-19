# portfolio/views.py

from django.shortcuts import render

def home(request):
    return render(request, 'index.html')   # Render index.html

def about(request):
    return render(request, 'about.html')  # Render about.html

def projects(request):
    return render(request, 'projects.html')  # Render projects.html

def contact(request):
    return render(request, 'contact.html')  # Render contact.html

def resume(request):
    return render(request, 'resume.html')  # Render resume.html

def blog(request):
    return render(request, 'blog.html')  # Render blog.html

def gallery(request):
    return render(request, 'gallery.html')  # Render gallery.html
