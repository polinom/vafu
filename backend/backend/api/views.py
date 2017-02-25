from rest_framework import permissions, viewsets
from rest_framework import status
from rest_framework.response import Response

from backend.trips.models import Goal, Deal, Favorite
from backend.users.models import User
from .permissions import IsOwner
from .serializers import GoalSerializer, UserSerializer, DealSerializer, FavoriteSerializer, FavoriteCreateSerializer


class DealViewSet(viewsets.ModelViewSet):
    """
    This endpoint presents Deals.
    """
    queryset = Deal.objects.all()
    serializer_class = DealSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Deal.objects.all()

        section = self.request.query_params.get('section', None)
        if section == 'favorites':
            queryset = queryset.filter(favorited_users__owner_id=self.request.user.id)
        elif section:
            queryset = queryset.none()

        return queryset


class FavoriteViewSet(viewsets.ModelViewSet):
    """
    This endpoint presents Favorites.
    The **owner** of the Favorite may update or delete instances of the Favorite.
    """
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def get_queryset(self):
        qs = Favorite.objects.all()
        if not self.request.user.is_superuser:
            qs = qs.filter(owner=self.request.user)
        return qs

    # We overwrite create methods in order to build a Favorite object using "request.user" and received "deal_id"
    def create(self, request, *args, **kwargs):
        serializer = FavoriteCreateSerializer(data={
            'owner_id': self.request.user.id,
            'deal_id': self.request.data['deal_id'],
        })

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save(
            owner_id=self.request.user.id,
            deal_id=self.request.data['deal_id'],
        )


class GoalViewSet(viewsets.ModelViewSet):
    """
    This endpoint presents Goals.
    The **owner** of the Goal may update or delete instances of the Goal.
    """
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def get_queryset(self):
        qs = Goal.objects.all()
        if not self.request.user.is_superuser:
            qs = qs.filter(owner=self.request.user)
        return qs

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This endpoint presents the users in the system.
    The collection of Trip instances owned by a user are serialized using a hyperlinked representation.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        pk = self.kwargs.get('pk')

        if pk == "current":
            return self.request.user

        return super(UserViewSet, self).get_object()
