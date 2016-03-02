from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Clue(models.Model):
    image_file = models.CharField(max_length=20)
    clue_text = models.CharField(max_length=100)
    clue_answer = models.CharField(max_length=20)
    clue_answer_length = models.CharField(max_length=15)
    image_copyright = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.clue_answer

class Game(models.Model):
    user_ip = models.CharField(max_length=20)
    user_location = models.CharField(max_length=200)
    user_score = models.IntegerField()
    user_name = models.CharField(max_length=20)
    date = models.DateTimeField('date of game')

    def __str_(self):
        return self.user_name + ' ' + str(self.date)



