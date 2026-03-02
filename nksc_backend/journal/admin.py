from django.contrib import admin
from .models import Journal, JournalArticle


class JournalArticleInline(admin.StackedInline):
    model = JournalArticle
    extra = 1
    fields = (
        ('title', 'language'),
        'title_bn',
        'authors',
        'author_affiliations',
        'abstract',
        'abstract_bn',
        'keywords',
        ('date_submission', 'date_acceptance', 'date_publication'),
        ('doi', 'order_in_journal', 'start_page'),
    )
    ordering = ['order_in_journal']
    show_change_link = True


@admin.register(Journal)
class JournalAdmin(admin.ModelAdmin):
    list_display = ("title", "volume", "year", "issue", "editor", "article_count", "is_published", "created_at")
    list_filter = ("year", "is_published")
    search_fields = ("title", "editor", "issn", "volume")
    ordering = ["-year", "-created_at"]
    inlines = [JournalArticleInline]

    fieldsets = (
        ("Journal Identification", {
            "fields": ("title", ("volume", "issue", "year"), ("editor", "issn"), "doi_url")
        }),
        ("Content", {
            "fields": ("description", ("pages", "file_size_mb"))
        }),
        ("Files", {
            "fields": ("pdf_file", "preview_image")
        }),
        ("Publishing", {
            "fields": ("is_published",)
        }),
    )

    def article_count(self, obj):
        count = obj.articles.count()
        return f"{count} article{'s' if count != 1 else ''}"
    article_count.short_description = "Articles"


@admin.register(JournalArticle)
class JournalArticleAdmin(admin.ModelAdmin):
    list_display = ("short_title", "journal", "language", "order_in_journal", "date_publication", "start_page")
    list_filter = ("language", "journal__year", "journal__volume")
    search_fields = ("title", "title_bn", "authors", "keywords", "abstract")
    ordering = ["journal", "order_in_journal"]
    autocomplete_fields = ["journal"]
    raw_id_fields = ["journal"]

    fieldsets = (
        ("Article Identification", {
            "fields": ("journal", ("language", "order_in_journal", "start_page"))
        }),
        ("Title", {
            "fields": ("title", "title_bn"),
        }),
        ("Authors", {
            "fields": ("authors", "author_affiliations"),
            "description": "Enter authors as comma-separated names. Add affiliations in the text area (one per line)."
        }),
        ("Content", {
            "fields": ("abstract", "abstract_bn", "keywords"),
        }),
        ("Dates", {
            "fields": (("date_submission", "date_acceptance", "date_publication"),),
        }),
        ("DOI", {
            "fields": ("doi",),
        }),
    )

    def short_title(self, obj):
        return obj.title[:70] + ("..." if len(obj.title) > 70 else "")
    short_title.short_description = "Title"
