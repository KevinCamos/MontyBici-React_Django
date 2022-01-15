# Generated by Django 3.1.14 on 2022-01-14 23:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bikes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bikes',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.CharField(max_length=20)),
                ('location', models.CharField(max_length=50)),
            ],
        ),
        migrations.DeleteModel(
            name='Todo',
        ),
    ]
