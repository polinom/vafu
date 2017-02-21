from rest_framework import serializers

from backend.trips.models import Trip, Deal, Favorite
from backend.users.models import User


class DealSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Deal
        fields = ('url', 'title', 'description', 'destination_country', 'seller_name', 'price',)
        extra_kwargs = {
            'url': {'view_name': 'api:deal-detail'}
        }


class FavoriteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Favorite
        fields = ('url', 'owner', 'deal', 'created_at',)
        extra_kwargs = {
            'deal': {'view_name': 'api:deal-detail'},
            'owner': {'view_name': 'api:user-detail'},
            'url': {'view_name': 'api:favorite-detail'},
        }


class TripSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Trip
        fields = (
            'url', 'owner', 'created_at', 'updated_at',
            'title', 'description', 'budget_estimate', 'funding_progress', 'travel_date',
        )
        extra_kwargs = {
            'owner': {'view_name': 'api:user-detail'},
            'url': {'view_name': 'api:trip-detail'},
        }


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'favorites', 'trips')
        extra_kwargs = {
            'favorites': {'view_name': 'api:favorite-detail'},
            'trips': {'view_name': 'api:trip-detail'},
            'url': {'view_name': 'api:user-detail'},
        }
