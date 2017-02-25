# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-23 07:29
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0005_auto_20170222_2302'),
    ]

    operations = [
        migrations.AlterField(
            model_name='deal',
            name='destination_country',
            field=models.CharField(blank=True, default='', max_length=100, verbose_name='destination country'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='deal',
            name='price',
            field=models.DecimalField(blank=True, decimal_places=4, max_digits=13, null=True, verbose_name='price'),
        ),
    ]