# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-25 22:27
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0009_rename_goals_params'),
    ]

    operations = [
        migrations.AlterField(
            model_name='goal',
            name='title',
            field=models.CharField(max_length=100, verbose_name='title'),
        ),
    ]
