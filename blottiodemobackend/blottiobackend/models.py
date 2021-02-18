from django.db import models

# Create your models here.
class Skill(models.Model):
    skill = models.CharField(max_length=200)

class TechStack(models.Model):
    techstack = models.CharField(max_length=200)


class Prospect(models.Model):
    firstname = models.CharField(max_length=200)
    lastname = models.CharField(max_length=200)
    age = models.IntegerField()
    hourly_rate = models.DecimalField(decimal_places=2,max_digits=20)
    cv = models.FileField(upload_to='uploads/')
    skills = models.ManyToManyField(Skill)
    techstack = models.ManyToManyField(TechStack)


