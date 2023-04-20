# Generated by Django 4.2 on 2023-04-20 14:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_user_address_remove_user_allow_news_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_customer',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='is_manufacturer',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='category',
            name='image',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='product',
            name='images',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='rating',
            field=models.FloatField(blank=True, default=0, null=True),
        ),
    ]
