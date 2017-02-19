# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.contrib import admin

from .models import Trip, Deal


@admin.register(Deal)
class DealAdmin(admin.ModelAdmin):
    list_display = ['title']
    search_fields = ['title']


@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display = ['owner', 'title', 'created_at']
    search_fields = ['owner__username', 'title']
