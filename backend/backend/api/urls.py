from django.urls import path
from . import views

urlpatterns = [
    path("jobs/create/", views.JobCreate.as_view(), name="create-job"),
    path("jobs/seeker/", views.JobListSeeker.as_view(), name="job-list-seeker"),
    path("jobs/employer/", views.JobListEmployer.as_view(), name="job-list-employer"),
    path(
        "jobs/employer/<int:pk>/update/",
        views.JobEmployerUpdate.as_view(),
        name="job-update-employer",
    ),
    path("jobs/delete/<int:pk>/", views.JobDelete.as_view(), name="delete-job"),
    path(
        "jobs/seeker/apply/",
        views.CreateApplicationView.as_view(),
        name="create-application",
    ),
    path(
        "seeker/applications/",
        views.UserApplicationsView.as_view(),
        name="user-applications",
    ),
    path(
        "employer/applications/",
        views.EmployerJobApplicationsView.as_view(),
        name="employer-applications",
    ),
]
