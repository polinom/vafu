from rest_framework import permissions
from rest_framework import viewsets

from backend.trips.models import Trip, Deal, Favorite
from backend.users.models import User
from .permissions import IsOwner
from .serializers import TripSerializer, UserSerializer, DealSerializer, FavoriteSerializer


class DealViewSet(viewsets.ModelViewSet):
    """
    This endpoint presents Deals.
    """
    queryset = Deal.objects.all()
    serializer_class = DealSerializer
    permission_classes = (permissions.IsAuthenticated,)


class FavoriteViewSet(viewsets.ModelViewSet):
    """
    This endpoint presents Favorites.
    The **owner** of the Favorite may update or delete instances of the Favorite.
    """
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


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
