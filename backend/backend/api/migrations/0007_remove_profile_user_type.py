# Generated by Django 5.0.6 on 2024-07-20 18:13

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0006_alter_profile_user"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="profile",
            name="user_type",
        ),
    ]