from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    role = models.CharField(max_length=30)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "role"]

    def __str__(self):
        return self.email

    @property
    def profile(self):
        return self.profile


class Job(models.Model):
    title = models.CharField(max_length=100)
    company = models.CharField(max_length=50)
    description = models.TextField()
    requirements = models.TextField(default="empty")
    salary = models.CharField(max_length=100, default="500")
    location = models.CharField(max_length=100, default="Remote")
    is_active = models.BooleanField(default=True)
    total_applicants = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="jobs"
    )

    def __str__(self) -> str:
        return self.title


class Application(models.Model):
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="applications"
    )
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="applications")
    applied_at = models.DateTimeField(auto_now_add=True)
    cv = models.CharField(max_length=800, default="")

    def __str__(self):
        return f"{self.user.first_name} applied for {self.job.title}"


class Profile(models.Model):

    user = models.OneToOneField(CustomUser, null=True, on_delete=models.CASCADE)
    company = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=20)
    job_title = models.CharField(max_length=100)
    cv = models.CharField(max_length=800)

    def __str__(self):
        return self.user.first_name
