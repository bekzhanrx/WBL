from django.db import models
from django.contrib.auth.models import User, AbstractUser


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    img = models.CharField(max_length=100)


class Bus(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.IntegerField()
    img = models.CharField(max_length=255)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE,
        related_name='buses'
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             related_name='categories',
                             null=True, blank=True)


# class Manager(AbstractUser):
#     is_manager = models.BooleanField(default=False)
#
#     def __str__(self):
#         return self.username
#
#     class Meta:
#         verbose_name = 'Manager'
#         verbose_name_plural = 'Managers'
#
#         # Добавим аргумент related_name к полям groups и user_permissions
#     groups = models.ManyToManyField(
#         'auth.Group',
#         verbose_name='groups',
#         blank=True,
#         related_name='manager_groups'  # Уникальное имя для обратной связи с группами
#         )
#     user_permissions = models.ManyToManyField(
#         'auth.Permission',
#         verbose_name='user permissions',
#         blank=True,
#         related_name='manager_permissions'  # Уникальное имя для обратной связи с правами доступа
#         )

