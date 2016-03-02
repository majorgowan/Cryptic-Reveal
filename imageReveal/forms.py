from django import forms

class HiddenClueForm(forms.Form):
    last_clue_id = forms.CharField(widget=forms.HiddenInput())
    total_points = forms.CharField(widget=forms.HiddenInput())

