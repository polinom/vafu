# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-26 11:35
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Follower',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='created at')),
                ('following', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='followers_users', to=settings.AUTH_USER_MODEL)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='following_users', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'follower',
                'verbose_name_plural': 'followers',
                'ordering': ('-created_at',),
            },
        ),
        migrations.AlterUniqueTogether(
            name='follower',
            unique_together=set([('owner', 'following')]),
        ),
    ]
