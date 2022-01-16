import imp
from django.shortcuts import render
from .models import Todo
from .serializers import TodoSerializers
# Create your views here.

from rest_framework import viewsets



class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializers
    queryset = Todo.objects.all()
    
