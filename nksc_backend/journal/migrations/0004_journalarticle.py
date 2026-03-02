# Generated migration for JournalArticle model

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('journal', '0003_alter_journal_options'),
    ]

    operations = [
        # Update Journal model to add ordering
        migrations.AlterModelOptions(
            name='journal',
            options={'ordering': ['-year', '-created_at']},
        ),
        # Change Journal __str__ via field label update (no field change needed)

        # Create the JournalArticle model
        migrations.CreateModel(
            name='JournalArticle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=500)),
                ('title_bn', models.CharField(
                    blank=True,
                    max_length=500,
                    help_text='Bengali title (optional)'
                )),
                ('authors', models.TextField(
                    help_text="Comma-separated list of authors (e.g., 'Afroza Bulbul, John Doe')"
                )),
                ('author_affiliations', models.TextField(
                    blank=True,
                    help_text='Author details — department, institution, email (one per line or JSON)'
                )),
                ('abstract', models.TextField()),
                ('abstract_bn', models.TextField(blank=True, help_text='Bengali abstract (optional)')),
                ('keywords', models.TextField(blank=True, help_text='Comma-separated keywords')),
                ('date_submission', models.DateField(blank=True, null=True, help_text='Date of Submission')),
                ('date_acceptance', models.DateField(blank=True, null=True, help_text='Date of Acceptance')),
                ('date_publication', models.DateField(blank=True, null=True, help_text='Date of Publication')),
                ('doi', models.CharField(blank=True, max_length=255, help_text='DOI identifier for this article')),
                ('order_in_journal', models.PositiveIntegerField(
                    default=1,
                    help_text='Order/sequence of article in this journal issue'
                )),
                ('start_page', models.PositiveIntegerField(
                    blank=True,
                    null=True,
                    help_text='Starting page number in journal PDF'
                )),
                ('language', models.CharField(
                    choices=[('en', 'English'), ('bn', 'Bengali'), ('both', 'Bilingual')],
                    default='en',
                    max_length=10
                )),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('journal', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE,
                    related_name='articles',
                    to='journal.journal'
                )),
            ],
            options={
                'ordering': ['order_in_journal'],
            },
        ),
    ]
