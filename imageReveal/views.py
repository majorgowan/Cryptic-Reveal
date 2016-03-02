from django.shortcuts import render, redirect
from django.utils import timezone
from django.core.urlresolvers import reverse

from .models import Clue, Game

from .forms import HiddenClueForm

# Create your views here.
def index(request):
    request.session['current_clue'] = 1
    request.session['total_points'] = 0
    return render(request, 'imageReveal/index.html')

def hbte(request):
    total_points = request.session['total_points']
    context = {
            'points': total_points,
            }
    return render(request, 'imageReveal/hbte.html', context)

def highscores(request):
    instances = Game.objects.order_by('-user_score').all()[:5]
    zipadee = [(inst.user_score, inst.user_name, inst.user_location, inst.date) for inst in instances] 
    context = {
            'zipadee': zipadee,
            }
    return render(request, 'imageReveal/highscores.html', context)

def serveClue(request):
    form = HiddenClueForm()
    print('\nserving serving serving!!!\n\n')
    context = {}

    if request.method == 'POST':
        form = HiddenClueForm(request.POST)
        print('POST POST POST\n\n')

        if form.is_valid():
            print('VALID VALID VALID\n\n')
            clue_id = int(form.cleaned_data['last_clue_id'])
            total_points = int(form.cleaned_data['total_points'])
            # move to next clue
            clue_id = clue_id + 1
            request.session['current_clue'] = clue_id
            request.session['total_points'] = total_points
            print('clue_id is ' + str(clue_id))
            print('total_points is ' + str(total_points))
            print(' ')
            if clue_id == 4:
                return redirect("imageReveal:hbte")
            else:
                # retrieve clue information from database
                instance = Clue.objects.get(id=clue_id)
                clue_answer_words = instance.clue_answer.split(' ')
                context = {
                        'clue_id': clue_id,
                        'clue_text': instance.clue_text,
                        'clue_length': instance.clue_answer_length,
                        'clue_answer': instance.clue_answer,
                        'clue_answer_words': clue_answer_words,
                        'image_file': instance.image_file,
                        'image_copyright': instance.image_copyright,
                        'total_points': total_points,
                        }
                return redirect("imageReveal:clue")
    else:
        # first time through
        print('clue_id is ' + str(request.session['current_clue']))
        print('total_points is ' + str(request.session['total_points']))
        clue_id = request.session['current_clue']
        total_points = request.session['total_points']
        instance = Clue.objects.get(id=clue_id)
        clue_answer_words = instance.clue_answer.split(' ')
        # convert from unicode
        clue_answer_words = [str(word) for word in clue_answer_words]
        context = {
                'clue_id': clue_id,
                'clue_text': instance.clue_text,
                'clue_length': instance.clue_answer_length,
                'clue_answer': instance.clue_answer,
                'clue_answer_words': clue_answer_words,
                'image_file': instance.image_file,
                'image_copyright': instance.image_copyright,
                'total_points': total_points,
                }

    return render(request, 'imageReveal/clue.html', context)

