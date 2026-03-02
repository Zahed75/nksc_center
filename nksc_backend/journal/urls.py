from django.urls import path

from journal.views import (
    JournalListAPIView,
    JournalCreateAPIView,
    JournalUpdateAPIView,
    JournalDeleteAPIView,
    JournalDetailAPIView,
    JournalArticleListAPIView,
    JournalArticleCreateAPIView,
    JournalArticleUpdateAPIView,
    JournalArticleDeleteAPIView,
    JournalArticleRetrieveAPIView,
    filter_journals,
)

urlpatterns = [
    # Journal CRUD
    path("get-all-journals/", JournalListAPIView.as_view()),
    path("create/", JournalCreateAPIView.as_view()),
    path("update/<int:journal_id>/", JournalUpdateAPIView.as_view()),
    path("delete/<int:journal_id>/", JournalDeleteAPIView.as_view()),
    path("filter/", filter_journals),

    # Journal detail with articles
    path("detail/<int:journal_id>/", JournalDetailAPIView.as_view()),

    # Articles
    path("articles/detail/<int:article_id>/", JournalArticleRetrieveAPIView.as_view()),
    path("<int:journal_id>/articles/", JournalArticleListAPIView.as_view()),
    path("articles/create/", JournalArticleCreateAPIView.as_view()),
    path("articles/update/<int:article_id>/", JournalArticleUpdateAPIView.as_view()),
    path("articles/delete/<int:article_id>/", JournalArticleDeleteAPIView.as_view()),
]
