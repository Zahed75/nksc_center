from rest_framework import serializers
from .models import Journal, JournalArticle


class JournalArticleSerializer(serializers.ModelSerializer):
    authors_list = serializers.SerializerMethodField()
    keywords_list = serializers.SerializerMethodField()

    class Meta:
        model = JournalArticle
        fields = [
            'id', 'journal', 'title', 'title_bn', 'authors', 'authors_list',
            'author_affiliations', 'abstract', 'abstract_bn', 'keywords',
            'keywords_list', 'date_submission', 'date_acceptance', 'date_publication',
            'doi', 'order_in_journal', 'start_page', 'language', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def get_authors_list(self, obj):
        return obj.get_authors_list()

    def get_keywords_list(self, obj):
        return obj.get_keywords_list()


class JournalSerializer(serializers.ModelSerializer):
    articles = JournalArticleSerializer(many=True, read_only=True)
    article_count = serializers.SerializerMethodField()

    class Meta:
        model = Journal
        fields = [
            'id', 'title', 'volume', 'year', 'issue', 'editor', 'issn', 'doi_url',
            'description', 'pages', 'file_size_mb', 'pdf_file', 'preview_image',
            'is_published', 'created_at', 'article_count', 'articles'
        ]

    def get_article_count(self, obj):
        return obj.articles.count()

    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get("request")

        if instance.pdf_file and request:
            data["pdf_file"] = request.build_absolute_uri(instance.pdf_file.url)
        else:
            data["pdf_file"] = None

        if instance.preview_image and request:
            data["preview_image"] = request.build_absolute_uri(instance.preview_image.url)
        else:
            data["preview_image"] = None

        return data


class JournalListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views — excludes articles for performance."""
    article_count = serializers.SerializerMethodField()

    class Meta:
        model = Journal
        fields = [
            'id', 'title', 'volume', 'year', 'issue', 'editor', 'issn', 'doi_url',
            'description', 'pages', 'file_size_mb', 'pdf_file', 'preview_image',
            'is_published', 'created_at', 'article_count'
        ]

    def get_article_count(self, obj):
        return obj.articles.count()

    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get("request")

        if instance.pdf_file and request:
            data["pdf_file"] = request.build_absolute_uri(instance.pdf_file.url)
        else:
            data["pdf_file"] = None

        if instance.preview_image and request:
            data["preview_image"] = request.build_absolute_uri(instance.preview_image.url)
        else:
            data["preview_image"] = None

        return data
