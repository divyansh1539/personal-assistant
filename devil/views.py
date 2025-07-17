from django.shortcuts import render
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required

# @login_required
# def login_page(request):
#     return render(request,"login.html")

def register_page(request):
    return render(request,"register.html")


