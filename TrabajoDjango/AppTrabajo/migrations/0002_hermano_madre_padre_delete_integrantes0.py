# Generated by Django 4.1.3 on 2022-12-06 00:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AppTrabajo', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Hermano',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=10)),
                ('apellido', models.CharField(max_length=10)),
                ('edad', models.IntegerField()),
                ('dia', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Madre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=10)),
                ('apellido', models.CharField(max_length=10)),
                ('edad', models.IntegerField()),
                ('dia', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Padre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=10)),
                ('apellido', models.CharField(max_length=10)),
                ('edad', models.IntegerField()),
                ('dia', models.CharField(max_length=50)),
            ],
        ),
        migrations.DeleteModel(
            name='Integrantes0',
        ),
    ]
