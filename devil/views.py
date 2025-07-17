from django.shortcuts import render
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required



def register_page(request):
    return render(request,"register.html")


def login_page(request):
    return render(request,"login.html")