from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Category, Bus


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class BusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bus
        fields = '__all__'


class CategorySerializer2(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    description = serializers.CharField()

    def create(self, validated_data):
        instance = Category(name=validated_data.get("name"),description=validated_data.get("description"))
        instance.save()
        return instance

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name")
        instance.description = validated_data.get("description")
        instance.save()
        return instance


class BusSerializer2(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    description = serializers.CharField()
    price = serializers.IntegerField()
    category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), write_only=True, required=True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True, required=False)

    def create(self, validated_data):
        category_id = validated_data.pop('category_id', None)
        user_id = validated_data.pop('user_id', None)

        bus = Bus.objects.create(**validated_data, category_id=category_id, user_id=user_id)
        return bus

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get("description", instance.description)
        instance.price = validated_data.get("price", instance.price)

        category_id = validated_data.get('category_id', None)
        if category_id:
            instance.category_id = category_id

        user_id = validated_data.get('user_id', None)
        if user_id:
            instance.user_id = user_id

        instance.save()
        return instance

