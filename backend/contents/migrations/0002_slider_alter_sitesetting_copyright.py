# Generated by Django 5.0.3 on 2024-12-26 20:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contents', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Slider',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='sliders', verbose_name='Image')),
                ('url', models.URLField(max_length=300, verbose_name='Url')),
                ('is_active', models.BooleanField(db_index=True, default=True, verbose_name='Active')),
            ],
            options={
                'verbose_name': 'Slider',
                'verbose_name_plural': 'Sliders',
            },
        ),
        migrations.AlterField(
            model_name='sitesetting',
            name='copyright',
            field=models.CharField(default='All right reserved ©', max_length=200, null=True, verbose_name='Copyright'),
        ),
    ]
