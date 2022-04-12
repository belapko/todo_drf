from django.contrib import admin
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from rest_framework.routers import DefaultRouter
from users.views import UserViewSet
from todo.views import ProjectViewSet, TodoViewSet
from rest_framework.authtoken.views import obtain_auth_token
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from graphene_django.views import GraphQLView
from django.views.generic import TemplateView


router = DefaultRouter()
router.register('users', UserViewSet)
router.register('projects', ProjectViewSet)
router.register('todos', TodoViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title='Todo',
        default_version='1.0',
        description='some description',
        contact=openapi.Contact(email='belapko@yandex.ru'),
        license=openapi.License(name='MyLicense')
    ),
    public=True,
    permission_classes=(AllowAny, )
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('api-auth-token/', obtain_auth_token),
    path('swagger/', schema_view.with_ui()),
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True))), # Graphene interactive ql для удобной отладки
    path('', TemplateView.as_view(template_name='index.html')),
]
