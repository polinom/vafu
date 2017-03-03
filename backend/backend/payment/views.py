from django.http import JsonResponse
from django.conf import settings
import json

import stripe

from backend.trips.models import Deal

stripe.api_key = settings.STRIPE_PRIVAT_KEY


def save_stripe_token(request):

    data = json.loads(request.body.decode())

    deal = Deal.objects.get(pk=int(data['dealId']))

    customer = stripe.Customer.create(
        email=data['email'],
        source=data['id']
    )

    charge = stripe.Charge.create(
        customer=customer.id,
        amount=int(deal.price) * 100,
        currency='cad',
        description='Trip charge'
    )

    return JsonResponse({'foo': 'bar'})
