# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import

from django.contrib.auth.models import AbstractUser
from django.core.urlresolvers import reverse
from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from django.utils.translation import ugettext_lazy as _

from backend.trips.behaviors import Timestampable2


@python_2_unicode_compatible
class User(AbstractUser):

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_('Name of User'), blank=True, max_length=255)

    def __str__(self):
        return self.username

    def get_absolute_url(self):
        return reverse('users:detail', kwargs={'username': self.username})


class Follower(Timestampable2, models.Model):
    owner = models.ForeignKey(User, related_name='following_users')
    following = models.ForeignKey(User, related_name='followers_users')

    def get_absolute_url(self):
        return reverse('users:detail', kwargs={'id': self.id})

    class Meta:
        ordering = ('-created_at',)
        verbose_name = _('follower')
        verbose_name_plural = _('followers')

        unique_together = (
            ('owner', 'following'),
        )
