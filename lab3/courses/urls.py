from django.urls import path
from . import views

urlpatterns = [
    path('courselist/', views.course_list, name='course-list'),
    path('addcourse/', views.add_course, name='add-course'),
    path('display/', views.display_courses, name='display-courses'),
]