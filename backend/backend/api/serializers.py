from rest_framework import serializers

from backend.trips.models import Trip, Deal
from backend.users.models import User


class DealSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Deal
        fields = (
            'url', 'title', 'description', 'destination_country', 'seller_name', 'price',
        )
        extra_kwargs = {
            'url': {'view_name': 'api:deal-detail'}
        }


class TripSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Trip
        fields = (
            'url', 'owner', 'created_at', 'updated_at',
            'title', 'description', 'budget_estimate', 'funding_progress', 'travel_date',
        )
        extra_kwargs = {
            'url': {'view_name': 'api:trip-detail'}
        }


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'trips')
        extra_kwargs = {
            'url': {'view_name': 'api:user-detail'},
            'trips': {'view_name': 'api:trip-detail'}
        }
