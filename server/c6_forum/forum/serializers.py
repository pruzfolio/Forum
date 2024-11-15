from rest_framework import serializers
from .models import User, Post, Comment, Like 
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        data = super().validate(attrs)
        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class PostSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')
    like_count = serializers.IntegerField(source='likes.count', read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'category', 'labels', 'media', 'created_by', 'created_at', 'like_count')

    def create(self, validated_data):
        user = self.context['request'].user  # Access authenticated user from request
        post = Post.objects.create(created_by=user, **validated_data)  # Associate authenticated user with the post
        return post

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.media:
            representation['media'] = instance.media.url  # Ensure media URL is returned in response
        return representation

class CommentSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Comment
        fields = ('id', 'post', 'author', 'content', 'created_at')

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('post', 'user')
