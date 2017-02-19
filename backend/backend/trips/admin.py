# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.contrib import admin

from .models import Trip


@admin.register(Trip)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['owner', 'title', 'created_at']
    search_fields = ['owner__username', 'title']
