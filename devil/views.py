from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login,logout,authenticate
from django.contrib import messages
from django.db.models import Q
from django.http import JsonResponse
from .utils.gpt import get_gemini_response
from django.views.decorators.csrf import csrf_exempt


def index(request):
    return render(request,"index.html")

def login_page(request):
    if request.method =="POST":
        user_input =request.POST.get("username")   
        password =request.POST.get("password")
        user_obj = User.objects.filter(Q(username =user_input) | Q(email =user_input)).first()
        if user_obj is None:
            messages.error(request,"username or email is invalid")
            return redirect("/")
        user =authenticate(username =user_obj.username, password =password)
        if user is None:
            messages.error(request,"invalid password")
            return redirect("/")
        else:
            login(request,user)
            return redirect("index")
    return render(request, "login.html")
        

def register_page(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password1")
        confirm_password = request.POST.get("password2")

        if password != confirm_password:
            messages.error(request, "❌ Passwords do not match.")
            return render(request, "register.html")

        if User.objects.filter(username=username).exists():
            messages.error(request, "❌ Username already exists.")
            return render(request, "register.html")

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()

        return redirect("/")  

    return render(request, "register.html")

def logout_page(request):
    logout(request,User)
    return redirect("/")
@csrf_exempt

def chat_with_gpt(request):
    if request.method == "POST":
        user_message = request.POST.get("message")
        if not user_message:
            return JsonResponse({"error": "No message provided"}, status=400)
        
        reply = get_gemini_response(user_message)
        return JsonResponse({"response": reply})
