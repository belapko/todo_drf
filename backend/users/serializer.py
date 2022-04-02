from rest_framework.serializers import ModelSerializer
from .models import User


class UserModelSerializerV1(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password')


class UserModelSerializerV2(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password', 'is_superuser', 'is_staff')

