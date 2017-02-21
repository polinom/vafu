from django.core.urlresolvers import reverse
from django.db import models
from django.utils.translation import ugettext_lazy as _

from backend.users.models import User
from .behaviors import Timestampable, Timestampable2


class Deal(models.Model):
    title = models.CharField(_('title'), max_length=100, blank=True)
    description = models.TextField(_('description'), blank=True)

    destination_country = models.DecimalField(
        _('destination country'), null=True, blank=True, max_digits=13, decimal_places=4)

    seller_name = models.CharField(_('seller name'), max_length=255, blank=True)
    price = models.IntegerField(_('price'), null=True, blank=True)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('deal:detail', kwargs={'id': self.id})

    class Meta:
        verbose_name = _('deal')
        verbose_name_plural = _('deals')


class Favorite(Timestampable2, models.Model):
    owner = models.ForeignKey(User, related_name='favorites')
    deal = models.ForeignKey(Deal, related_name='deals')

    def get_absolute_url(self):
        return reverse('favorites:detail', kwargs={'id': self.id})

    class Meta:
        ordering = ('-created_at',)
        verbose_name = _('favorite')
        verbose_name_plural = _('favorites')


class Trip(Timestampable, models.Model):
    owner = models.ForeignKey(User, related_name='trips')

    title = models.CharField(_('title'), max_length=100, blank=True)
    description = models.TextField(_('description'), blank=True)
    budget_estimate = models.IntegerField(_('budget estimate'), null=True, blank=True)
    funding_progress = models.IntegerField(_('funding progress'), null=True, blank=True)
    travel_date = models.DateTimeField(_('travel date'), null=True, blank=True)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('trips:detail', kwargs={'id': self.id})

    class Meta:
        ordering = ('-created_at',)
        verbose_name = _('trip')
        verbose_name_plural = _('trips')
