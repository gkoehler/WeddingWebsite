from django.shortcuts import render
from rest_framework import viewsets
from rsvps.models import Invitee, RSVPLog
from rsvps.serializers import InviteeSerializer

class InviteeViewSet(viewsets.ModelViewSet):
	queryset = Invitee.objects.all()
	serializer_class = InviteeSerializer
