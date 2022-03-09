from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.response import Response

from .models import Project, Todo
from .serializer import ProjectModelSerializer, TodoModelSerializer
from rest_framework.viewsets import ModelViewSet

from rest_framework.pagination import PageNumberPagination
from django_filters import FilterSet, DateFilter, DateFromToRangeFilter


class ProjectPagination(PageNumberPagination):
    page_size = 10


class TodoPagination(PageNumberPagination):
    page_size = 20


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectModelSerializer
    queryset = Project.objects.all()
    pagination_class = ProjectPagination

    def get_queryset(self):
        queryset = Project.objects.all()
        name = self.request.query_params.get('name', default=None)
        if name:
            queryset = queryset.filter(name__contains=name)
        return queryset


class TodoFilter(FilterSet):
    created_at = DateFromToRangeFilter()

    class Meta:
        model = Todo
        fields = ['project', 'created_at']


class TodoViewSet(ModelViewSet):
    serializer_class = TodoModelSerializer
    queryset = Todo.objects.all()
    pagination_class = TodoPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = TodoFilter

    def destroy(self, request, *args, **kwargs):
        todo = self.get_object()
        todo.is_active = False
        todo.save()
        return Response(status=status.HTTP_200_OK)