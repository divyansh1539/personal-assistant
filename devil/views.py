from django.shortcuts import render
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required



def register_page(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")

        if password != confirm_password:
            message.error(request,"❌ Passwords do not match.")
            return render(request,"register.html")

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()

        message.success(request,"✅ Account created successfully")
        return redirect("login")
    
    return render("login.html")

