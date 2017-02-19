from rest_framework import permissions
from rest_framework import viewsets

from backend.trips.models import Trip
from backend.users.models import User
from .permissions import IsOwner
from .serializers import TripSerializer, UserSerializer


class TripViewSet(viewsets.ModelViewSet):
    """
    This endpoint presents Trips.
    The **owner** of the Trip may update or delete instances of the Trip.
    """
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This endpoint presents the users in the system.
    The collection of Trip instances owned by a user are serialized using a hyperlinked representation.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
