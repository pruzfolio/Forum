from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Post, Comment, Like

# Custom User Admin to include groups and permissions
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')
    search_fields = ('username', 'email')
    ordering = ('id',)

    # Remove duplicate 'groups' and 'user_permissions' from fieldsets
    fieldsets = (
        ('User Info', {'fields': ('username', 'email', 'first_name', 'last_name', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important Dates', {'fields': ('last_login', 'date_joined')}),
    )

    # Remove duplicate 'groups' and 'user_permissions' from add_fieldsets
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'groups', 'user_permissions'),
        }),
    )

# Post Admin to manage posts
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'category', 'created_by', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('title', 'content', 'created_by__username')
    ordering = ('-created_at',)

# Comment Admin to manage comments
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'post', 'author', 'content', 'created_at')
    list_filter = ('created_at', 'post')
    search_fields = ('author__username', 'content')
    ordering = ('-created_at',)

# Like Admin to manage likes
class LikeAdmin(admin.ModelAdmin):
    list_display = ('id', 'post', 'user')
    list_filter = ('post',)
    search_fields = ('post__title', 'user__username')
    ordering = ('post',)

# Registering models to the admin interface
admin.site.register(User, CustomUserAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Like, LikeAdmin)
