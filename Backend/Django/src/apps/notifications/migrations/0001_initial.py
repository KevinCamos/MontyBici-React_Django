# Generated by Django 3.1.14 on 2022-04-29 15:53

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('bikes', '0001_initial'),
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Reason',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reason', models.CharField(max_length=64)),
            ],
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('message', models.TextField(blank=True, validators=[django.core.validators.MinLengthValidator(4)])),
                ('checked', models.BooleanField(default=False)),
                ('admin_check', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='admin_check', to='profiles.profile')),
                ('notif_user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='notif_user', to='profiles.profile')),
                ('reason', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='notifications.reason')),
                ('register', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='bikes.register_bike')),
            ],
            options={
                'ordering': ['-created_at', '-updated_at'],
                'abstract': False,
            },
        ),
    ]
