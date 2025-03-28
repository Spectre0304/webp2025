from django.contrib import admin
from .models import Course

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('department', 'course_title', 'instructor')
    search_fields = ('department', 'course_title', 'instructor')
    list_filter = ('department',)