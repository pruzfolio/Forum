from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Post, Comment, Like


class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')
    search_fields = ('username', 'email')
    ordering = ('id',)

  
    fieldsets = (
        ('User Info', {'fields': ('username', 'email', 'first_name', 'last_name', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important Dates', {'fields': ('last_login', 'date_joined')}),
    )

   
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'groups', 'user_permissions'),
        }),
    )

# manage posts
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'category', 'created_by', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('title', 'content', 'created_by__username')
    ordering = ('-created_at',)

# manage comments
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'post', 'author', 'content', 'created_at')
    list_filter = ('created_at', 'post')
    search_fields = ('author__username', 'content')
    ordering = ('-created_at',)

# manage likes
class LikeAdmin(admin.ModelAdmin):
    list_display = ('id', 'post', 'user')
    list_filter = ('post',)
    search_fields = ('post__title', 'user__username')
    ordering = ('post',)

admin.site.register(User, CustomUserAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Like, LikeAdmin)
