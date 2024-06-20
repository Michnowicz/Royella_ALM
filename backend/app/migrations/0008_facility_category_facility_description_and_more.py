# Generated by Django 4.2.11 on 2024-06-19 09:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_managerimg_alter_employeesimg_image_manager_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='facility',
            name='category',
            field=models.CharField(default='', max_length=32),
        ),
        migrations.AddField(
            model_name='facility',
            name='description',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='facility',
            name='display',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='facility',
            name='subtitle',
            field=models.CharField(default='', max_length=48),
        ),
    ]
