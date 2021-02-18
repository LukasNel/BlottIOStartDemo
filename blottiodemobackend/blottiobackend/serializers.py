from rest_framework import serializers
from .models import Prospect, Skill, TechStack
from pprint import pprint

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill

class TechstackSerializer(serializers.ModelSerializer):
    def to_representation(self, value):
        return value.techstack
    
    class Meta:
        model = TechStack
        fields = ["techstack",]
    def create(self, validated_data):
        print('Techstack Validated')
        pprint(validated_data)

        return TechStack(**validated_data)


class ProspectSerializer(serializers.ModelSerializer):  
    skills = serializers.ListField(write_only=True,child=serializers.CharField())
    techstack = serializers.ListField(write_only=True,child=serializers.CharField())
    
    class Meta:
        model = Prospect
        fields = ('firstname', 'lastname', 'age', 'hourly_rate', 'skills',  'techstack','cv')


    def create(self, validated_data):
        print('Prospect Validated')
        pprint(validated_data)
        p = Prospect()
        
        p.firstname = validated_data['firstname']
        p.age = validated_data['age']
        p.hourly_rate = validated_data['hourly_rate']
        p.save()
        for val in validated_data['skills']:
            print(val)
            obj, created = Skill.objects.get_or_create(
                skill=val
            )
            obj.save()
            p.skills.add(obj)
        for val in validated_data['techstack']:
            print(val)
            obj, created = TechStack.objects.get_or_create(
                techstack=val,
            )
            obj.save()
            p.techstack.add(obj)

        p.cv = validated_data['cv']
        print('done')
        p.save()
        return p
