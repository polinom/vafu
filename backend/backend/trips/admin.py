# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.contrib import admin

from .models import Goal, Deal, Favorite


@admin.register(Deal)
class DealAdmin(admin.ModelAdmin):
    list_display = ['title']
    search_fields = ['title']


@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ['owner', 'deal', 'created_at']
    search_fields = ['owner__username', 'deal__title']


@admin.register(Goal)
class TripAdmin(admin.ModelAdmin):
    list_display = ['owner', 'title', 'created_at']
    search_fields = ['owner__username', 'title']
