from django.db import models


class Course(models.Model):
    department = models.CharField(max_length=100, verbose_name="開課單位")
    course_title = models.CharField(max_length=200, verbose_name="課程名稱")
    instructor = models.CharField(max_length=100, verbose_name="授課老師")

    def __str__(self):
        return f"{self.department} - {self.course_title} ({self.instructor})"

    class Meta:
        verbose_name = "課程"
        verbose_name_plural = "課程"

