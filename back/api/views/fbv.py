import json

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import Bus, Category
from api.serializers import BusSerializer, CategorySerializer


@api_view(["GET","POST"])
def category_list(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        data = json.loads(request.body)
        serializer = CategorySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET","PUT","DELETE"])
def category_detail(request, pk=None):
    try:
        category = Category.objects.get(id=pk)
    except Category.DoesNotExist as e:
        return Response({"error": str(e)})
    if request.method == 'GET':
        serializer = CategorySerializer(category)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CategorySerializer(instance=category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        category.delete()
        return Response({"deleted": True})


@api_view(["GET","POST"])
def bus_list(request):
    if request.method == 'GET':
        buses = Category.objects.all()
        serializer = BusSerializer(buses, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        data = json.loads(request.body)
        serializer = BusSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET","PUT","DELETE"])
def bus_detail(request, pk=None):
    try:
        bus = Bus.objects.get(id=pk)
    except Bus.DoesNotExist as e:
        return Response({"error": str(e)})
    if request.method == 'GET':
        serializer = Bus(bus)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = BusSerializer(instance=bus, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        bus.delete()
        return Response({"deleted": True})