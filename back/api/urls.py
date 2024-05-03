from django.urls import path, re_path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.views import CategoryListAPIView, CategoryDetailAPIView, BusListAPIView, BusDetailAPIView, category_list, category_detail, bus_list, bus_detail


urlpatterns = [
    path('login/', TokenObtainPairView.as_view()),
    path('refresh/', TokenRefreshView.as_view()),
    path('categories/', CategoryListAPIView.as_view()),
    path('categories/<int:pk>/', CategoryDetailAPIView.as_view()),
    path('buses/', BusListAPIView.as_view()),
    path('buses/<int:pk>/', BusDetailAPIView.as_view()),
]
