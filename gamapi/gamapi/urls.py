from django.conf.urls import patterns, include, url
from django.contrib import admin
from rest_framework import routers
from rsvps import views

admin.autodiscover()

# router = routers.DefaultRouter()
# router.register(r'invitees', views.InviteeViewSet)

urlpatterns = patterns('',
	
	# url(r'^', include(router.urls)),

    url(r'^', include('rsvps.urls')),

    url(r'^admin/', include(admin.site.urls)),
    # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
)
