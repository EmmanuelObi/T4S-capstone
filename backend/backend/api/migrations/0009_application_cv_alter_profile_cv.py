# Generated by Django 5.0.6 on 2024-07-22 15:48

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0008_application"),
    ]

    operations = [
        migrations.AddField(
            model_name="application",
            name="cv",
            field=models.CharField(default="", max_length=800),
        ),
        migrations.AlterField(
            model_name="profile",
            name="cv",
            field=models.CharField(max_length=800),
        ),
    ]
