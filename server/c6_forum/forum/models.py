from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

# Custom User Model
class User(AbstractUser):
    groups = models.ManyToManyField(Group, related_name="forum_user_groups", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="forum_user_permissions", blank=True)

    def __str__(self):
        return self.username

# Post Model
class Post(models.Model):
    TIPS = 'tips'
    BUG = 'bug'
    INNOVATION = 'innovation'
    PRINTING = 'printing'

    CATEGORY_CHOICES = [
        (TIPS, 'Tips'),
        (BUG, 'Bug'),
        (INNOVATION, 'Innovation'),
        (PRINTING, 'Printing'),
    ]

    title = models.CharField(max_length=255)
    content = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default=TIPS)
    labels = models.CharField(max_length=255, blank=True)
    media = models.ImageField(upload_to='posts/', blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']  # Ensure posts are ordered by creation date (newest first)

# Comment Model
class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.author.username} on {self.post.title}"

    class Meta:
        ordering = ['created_at']  # Ensure comments are ordered by creation date (oldest first)

# Like Model
class Like(models.Model):
    post = models.ForeignKey(Post, related_name='likes', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('post', 'user')  # Ensure each user can like a post only once

    def __str__(self):
        return f"{self.user.username} likes {self.post.title}"
