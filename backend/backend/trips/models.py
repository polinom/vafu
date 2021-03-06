from django.core.urlresolvers import reverse
from django.db import models
from django.utils.translation import ugettext_lazy as _

from backend.users.models import User
from .behaviors import Timestampable, Timestampable2


class Deal(models.Model):
    title = models.CharField(_('title'), max_length=100, blank=True)
    image = models.URLField(_('image'), max_length=255, blank=True)
    description = models.TextField(_('description'), blank=True)

    destination_country = models.CharField(_('destination country'), max_length=100, blank=True)

    seller_name = models.CharField(_('seller name'), max_length=255, blank=True)
    price = models.DecimalField(_('price'), max_digits=13, decimal_places=4, null=True, blank=True)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('deals:detail', kwargs={'id': self.id})

    class Meta:
        verbose_name = _('deal')
        verbose_name_plural = _('deals')


class Favorite(Timestampable2, models.Model):
    owner = models.ForeignKey(User, related_name='favorite_deals')
    deal = models.ForeignKey(Deal, related_name='favorited_users')

    def get_absolute_url(self):
        return reverse('favorites:detail', kwargs={'id': self.id})

    class Meta:
        ordering = ('-created_at',)
        verbose_name = _('favorite')
        verbose_name_plural = _('favorites')

        unique_together = (
            ('deal', 'owner'),
        )


class Goal(Timestampable, models.Model):
    owner = models.ForeignKey(User, related_name='goals')

    title = models.CharField(_('title'), max_length=100, blank=False)
    image = models.URLField(_('image'), max_length=255, blank=True)
    description = models.TextField(_('description'), blank=True)
    budget_estimate = models.IntegerField(_('budget estimate'), null=True, blank=True)
    funding_progress = models.IntegerField(_('funding progress'), null=True, blank=True)
    travel_date = models.DateTimeField(_('travel date'), null=True, blank=True)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('goals:detail', kwargs={'id': self.id})

    class Meta:
        ordering = ('-created_at',)
        verbose_name = _('goal')
        verbose_name_plural = _('goals')
