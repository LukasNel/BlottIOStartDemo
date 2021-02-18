from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import FileUploadParser, MultiPartParser, FormParser
import pprint
from .serializers import ProspectSerializer
from .models import Prospect


class FileUploadView(APIView):
    parser_classes = [MultiPartParser]

    def put(self, request,   format=None):
        #file_obj = request.data['file']
        print('fileupload')
        # pprint(file_obj)
        
        pprint.pprint(request._request.FILES)
        pprint.pprint(request.data['file'])
        # ...
        # do some stuff with uploaded file
        # ...
        return Response(status=204)

class ProspectList(APIView):
    parser_classes = [MultiPartParser]
    def get(self, request, format=None):
        prospects = Prospect.objects.all()
        serializer = ProspectSerializer(prospects, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        print('Posting')
        pprint.pprint(request)
        pprint.pprint( request._request.POST)
        serializer = ProspectSerializer(data=request.data)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_201_CREATED)
    
    def put(self, request, format=None):
        print('Putting')
        pprint.pprint(request)
        pprint.pprint( request._request.POST)
        pprint.pprint( request._request.FILES)
        for key, value in  request._request.POST.items():
            print (("%s %s") % (key, value))
        print(request.data['firstname'])
        serializer = ProspectSerializer(data=request.data)
        if serializer.is_valid():
        #serializer.is_valid()
            print('sss')
            prospect = serializer.save()
            
            pprint.pprint(prospect)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")