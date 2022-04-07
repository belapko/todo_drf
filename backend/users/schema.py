import graphene
from graphene_django import DjangoObjectType
from .models import User
from todo.models import Todo, Project

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'

class UserType(DjangoObjectType):
    class Meta:
        model = User

class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'

class Query(graphene.ObjectType):
    all_todos = graphene.List(TodoType)

    def resolve_all_todos(root, info):
        return (
            Todo.objects.select_related("project")
            .all()
        )


schema = graphene.Schema(query=Query)
