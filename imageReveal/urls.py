from django.conf.urls import url

from . import views

app_name = 'imageReveal'
urlpatterns = [
        url(r'^$', views.index, name='index'),
        url(r'^clue$', views.serveClue, name='clue'),
        url(r'^hbte$', views.hbte, name='hbte'),
        ]

