# Generated by Django 4.1.3 on 2022-12-04 20:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Integrantes0',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=10)),
                ('apellido', models.CharField(max_length=10)),
                ('edad', models.IntegerField()),
            ],
        ),
    ]
