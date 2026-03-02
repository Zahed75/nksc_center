from django.db import models


class Journal(models.Model):
    title = models.CharField(max_length=255)
    volume = models.CharField(max_length=50)
    year = models.PositiveIntegerField()
    issue = models.CharField(max_length=100)
    editor = models.CharField(max_length=255)
    issn = models.CharField(max_length=50, blank=True)
    doi_url = models.URLField(blank=True)

    description = models.TextField()
    pages = models.PositiveIntegerField()
    file_size_mb = models.DecimalField(max_digits=5, decimal_places=2)

    pdf_file = models.FileField(upload_to="journals/")
    preview_image = models.ImageField(upload_to="journal_previews/", blank=True, null=True)

    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-year', '-created_at']

    def __str__(self):
        return f"{self.title} - Vol. {self.volume} ({self.year})"


class JournalArticle(models.Model):
    LANGUAGE_CHOICES = [
        ('en', 'English'),
        ('bn', 'Bengali'),
        ('both', 'Bilingual'),
    ]

    journal = models.ForeignKey(Journal, on_delete=models.CASCADE, related_name='articles')

    # Title (bilingual support)
    title = models.CharField(max_length=500)
    title_bn = models.CharField(max_length=500, blank=True, help_text="Bengali title (optional)")

    # Authors - stored as comma-separated string
    authors = models.TextField(help_text="Comma-separated list of authors (e.g., 'Afroza Bulbul, John Doe')")
    author_affiliations = models.TextField(
        blank=True,
        help_text="Author details — department, institution, email (one per line or JSON)"
    )

    # Abstract (bilingual)
    abstract = models.TextField()
    abstract_bn = models.TextField(blank=True, help_text="Bengali abstract (optional)")

    # Keywords
    keywords = models.TextField(
        blank=True,
        help_text="Comma-separated keywords"
    )

    # Publication dates
    date_submission = models.DateField(blank=True, null=True, help_text="Date of Submission")
    date_acceptance = models.DateField(blank=True, null=True, help_text="Date of Acceptance")
    date_publication = models.DateField(blank=True, null=True, help_text="Date of Publication")

    # DOI
    doi = models.CharField(max_length=255, blank=True, help_text="DOI identifier for this article")

    # Ordering within journal
    order_in_journal = models.PositiveIntegerField(default=1, help_text="Order/sequence of article in this journal issue")

    # Page reference
    start_page = models.PositiveIntegerField(blank=True, null=True, help_text="Starting page number in journal PDF")

    # Language
    language = models.CharField(max_length=10, choices=LANGUAGE_CHOICES, default='en')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order_in_journal']

    def __str__(self):
        return f"[{self.journal.volume}/{self.journal.year}] {self.title[:60]}"

    def get_authors_list(self):
        """Return authors as a Python list"""
        if not self.authors:
            return []
        return [a.strip() for a in self.authors.split(',') if a.strip()]

    def get_keywords_list(self):
        """Return keywords as a Python list"""
        if not self.keywords:
            return []
        return [k.strip() for k in self.keywords.split(',') if k.strip()]