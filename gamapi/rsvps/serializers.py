from rsvps.models import Invitee, RSVPLog
from rest_framework import serializers

class InviteeSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Invitee
		fields = ('name', 'num_allowed')
