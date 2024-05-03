from django.contrib import admin

from api.models import Category, Bus


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name',)
    search_fields = ('name',)


@admin.register(Bus)
class BusAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'price', 'category', 'user')
    search_fields = ('name',)

