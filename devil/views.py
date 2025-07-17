from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login
from django.contrib import messages


def login_page(request):
    return render(request, "login.html")

def register_page(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")

        if password != confirm_password:
            messages.error(request, "❌ Passwords do not match.")
            return render(request, "register.html")

        if User.objects.filter(username=username).exists():
            messages.error(request, "❌ Username already exists.")
            return render(request, "register.html")

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()

        messages.success(request, "✅ Account created successfully.")
        return redirect("login")  

    return render(request, "register.html")
