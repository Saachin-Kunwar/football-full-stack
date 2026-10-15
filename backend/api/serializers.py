from rest_framework import serializers
from .models import *

class CountrySerializer(serializers>modelSerializer):
    class Meta:
        model= Country
        fields=('id','name')

class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model=League
        fields=('id','name')


class CharacteristicSerializer(serializers.ModelSerializer):
    class Meta:
        model=Characteristic
        fields=('id','name')

class FootballCLubSerializer(serializers.ModelSerializer):
    class Meta:
        model= FootballClub
        fields="__all__"