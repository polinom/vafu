from rest_framework import serializers

from backend.trips.models import Goal, Deal, Favorite
from backend.users.models import User, Follower


class DealSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api:deal-detail')
    favorite_id = serializers.SerializerMethodField()

    def get_favorite_id(self, obj):
        return obj.favorited_users.filter(owner_id=self.context['request'].user.id).values_list('id', flat=True).first()

    class Meta:
        model = Deal
        fields = (
            'id', 'url', 'title', 'image', 'description', 'destination_country', 'seller_name', 'price', 'favorite_id')


class FavoriteSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api:favorite-detail')
    deal = serializers.HyperlinkedRelatedField(view_name='api:deal-detail', read_only=True)
    owner = serializers.HyperlinkedRelatedField(view_name='api:user-detail', read_only=True)

    class Meta:
        model = Favorite
        fields = ('id', 'url', 'owner', 'deal', 'created_at',)


class FavoriteCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ('owner_id', 'deal_id')


class FollowerSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api:follower-detail')
    owner = serializers.HyperlinkedRelatedField(view_name='api:user-detail', read_only=True)
    following = serializers.HyperlinkedRelatedField(view_name='api:user-detail', read_only=True)

    class Meta:
        model = Follower
        fields = ('id', 'url', 'owner', 'following', 'created_at',)


class FollowerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follower
        fields = ('owner_id', 'following_id')


class GoalSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api:goal-detail')
    owner = serializers.HyperlinkedRelatedField(view_name='api:user-detail', read_only=True)

    class Meta:
        model = Goal
        fields = (
            'id', 'url', 'owner', 'created_at', 'updated_at',
            'title', 'image', 'description', 'budget_estimate', 'funding_progress', 'travel_date',
        )


class UserSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api:user-detail')
    goals = serializers.HyperlinkedRelatedField(view_name='api:goal-detail', many=True, read_only=True)
    favorite_deals = serializers.HyperlinkedRelatedField(view_name='api:favorite-detail', many=True, read_only=True)

    followers_users = serializers.HyperlinkedRelatedField(view_name='api:follower-detail', many=True, read_only=True)
    following_users = serializers.HyperlinkedRelatedField(view_name='api:follower-detail', many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'favorite_deals', 'goals', 'followers_users', 'following_users')
