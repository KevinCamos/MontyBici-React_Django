# Generated by Django 3.1.14 on 2022-01-21 00:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stations', '0006_auto_20220121_0001'),
    ]

    operations = [
        migrations.RenameField(
            model_name='point',
            old_name='status',
            new_name='active',
        ),
    ]
