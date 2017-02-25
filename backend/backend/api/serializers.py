from rest_framework import serializers

from backend.trips.models import Trip, Deal, Favorite
from backend.users.models import User


class DealSerializer(serializers.HyperlinkedModelSerializer):
    favorite_id = serializers.SerializerMethodField()

    def get_favorite_id(self, obj):
        return obj.favorited_users.filter(owner_id=self.context['request'].user.id).values_list('id', flat=True).first()

    class Meta:
        model = Deal
        fields = (
            'id', 'url', 'title', 'image', 'description', 'destination_country', 'seller_name', 'price', 'favorite_id')
        extra_kwargs = {
            'url': {'view_name': 'api:deal-detail'},
        }


class FavoriteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Favorite
        fields = ('id', 'url', 'owner', 'deal', 'created_at',)
        extra_kwargs = {
            'deal': {'view_name': 'api:deal-detail'},
            'owner': {'view_name': 'api:user-detail'},
            'url': {'view_name': 'api:favorite-detail'},
        }


class FavoriteCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ('owner_id', 'deal_id')


class TripSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Trip
        fields = (
            'id', 'url', 'owner', 'created_at', 'updated_at',
            'title', 'image', 'description', 'budget_estimate', 'funding_progress', 'travel_date',
        )
        extra_kwargs = {
            'owner': {'view_name': 'api:user-detail'},
            'url': {'view_name': 'api:trip-detail'},
        }


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'favorite_deals', 'trips')
        extra_kwargs = {
            'favorite_deals': {'view_name': 'api:favorite-detail'},
            'trips': {'view_name': 'api:trip-detail'},
            'url': {'view_name': 'api:user-detail'},
        }
