# Generated by Django 3.1.14 on 2022-01-20 00:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bikes', '0004_auto_20220119_1506'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bike',
            name='location',
        ),
    ]
