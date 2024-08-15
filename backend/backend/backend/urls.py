from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, ProfileDetailView, SingleProfileDetailView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/profile/", ProfileDetailView.as_view(), name="user-profile"),
    path(
        "api/profile/<int:id>/",
        SingleProfileDetailView.as_view(),
        name="single-user-profile-detail",
    ),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),
]
