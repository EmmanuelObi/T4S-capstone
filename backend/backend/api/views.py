from django.shortcuts import get_object_or_404
from rest_framework import generics, response
from .serializers import (
    UserSerializer,
    JobSerializer,
    ProfileSerializer,
    ApplicationSerializer,
)
from .models import CustomUser, Job, Application, Profile
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import NotFound

# Create your views here.


class JobCreate(generics.CreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class JobEmployerUpdate(generics.UpdateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        job = get_object_or_404(Job, pk=self.kwargs["pk"], author=self.request.user)
        return job

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, "_prefetched_objects_cache", None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return response.Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()


class JobListEmployer(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role == "employer":
            return Job.objects.filter(author=user)

        return Job.objects.all()


class JobListSeeker(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):

        return Job.objects.all()


class JobDelete(generics.DestroyAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        return Job.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class ProfileDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile


class SingleProfileDetailView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "user__id"

    def get_object(self):
        try:
            user = CustomUser.objects.get(id=self.kwargs["id"])
            return user.profile
        except CustomUser.DoesNotExist:
            raise NotFound("User not found")


class CreateApplicationView(generics.CreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserApplicationsView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Application.objects.filter(user=self.request.user)


class EmployerJobApplicationsView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        employer = self.request.user
        if employer.role != "employer":
            return Application.objects.none()
        jobs = Job.objects.filter(author=employer)
        return Application.objects.filter(job__in=jobs)
