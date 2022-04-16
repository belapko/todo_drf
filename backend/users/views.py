from rest_framework import viewsets, mixins
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from .serializer import UserModelSerializerV1, UserModelSerializerV2
from .models import User
from rest_framework.pagination import PageNumberPagination


class UserViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    # serializer_class = UserModelSerializer
    queryset = User.objects.all()
    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserModelSerializerV2
        return UserModelSerializerV1