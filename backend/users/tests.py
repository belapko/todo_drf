from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, APITestCase, force_authenticate
from .views import  UserViewSet
from .models import User
from mixer.backend.django import mixer
# Create your tests here.
class TestUserApi(TestCase):
    def test_get_list_1(self):
        factory = APIRequestFactory()
        user = User.objects.create(username='testUser', first_name='Степан', last_name='Белапко')
        request = factory.get('/api/users/')
        force_authenticate(request, user)
        view = UserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list_2(self):
        client = APIClient()
        response = client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class TestUserClientApi(APITestCase):
    def setUp(self) -> None:
        for i in range(0, 1000):
            self.user = mixer.blend(User)
        self.admin = User.objects.create_superuser('stepan', email='testmail@mail.com', password='stepan')


    def test_get_list_3(self):
        User.objects.create(username='testUser', first_name='Степан', last_name='Белапко')
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_get_list_4(self):
        User.objects.create_superuser('stepan1', email='testmail1@mail.com', password='stepan')
        User.objects.create(username='testUser', first_name='Степан', last_name='Белапко')
        self.client.login(username='stepan1', password='stepan')
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)