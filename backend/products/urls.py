from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.ProductListView.as_view()),
    path('product/<slug:slug>', views.ProductDetailView.as_view()),
    path('categories/', views.CategoryListView.as_view()),
    path('brands/', views.BrandListView.as_view()),
    path('special-sale/', views.SpecialSaleListView.as_view()),
    path('search', views.SearchApiView.as_view()),
]