from django.db import models
from users.models import User


class Project(models.Model):
    name = models.CharField(max_length=128, unique=True)
    users = models.ManyToManyField(User)
    repository = models.URLField(blank=True)


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    creator = models.ForeignKey(User, on_delete=models.PROTECT)
    is_active = models.BooleanField(default=True)