from django.shortcuts import render

from rest_framework import status, serializers
from rest_framework.exceptions import NotFound
# AUTENTICATIONS
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response
from rest_framework.views import APIView

# SERIALIZERS
from .serializers import NotificationSerializer

# MODELS
from src.apps.bikes.models import Register_Bike
from .models import Reason, Notification

# PERMSISSIONS
from src.apps.core.permissions import IsStaff,IsNotStaff


class RegisterAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = NotificationSerializer
    # permission_classes = [IsStaff, ]

    def post(self, request):
        self_uuid = self.request.user.profile.pk
        id_register = request.data.get('id_register', {})
        id_reason = request.data.get('id_reason', {})
        message = request.data.get('message', {})
        if id_register:
            print(id_register, "id register")
            registered = Register_Bike.objects.filter(
                pk=id_register, user=self_uuid)
                
            if registered.count() != 0:
                raise serializers.ValidationError(
                    'Esta ID de registro no concuerda con el usuario, un usuario solo puede referenciar un registro propio.')
        
        else:
            id_register = None

        try:
            print(id_reason, "id reason")

            reason = Reason.objects.get(pk=id_reason)
        except Reason.DoesNotExist:
            raise NotFound('Esta razón no existe.')


        data = {
            'notif_user': self_uuid,
            'reason': reason.pk,
            'register':id_register,
            "message":message

        }

        serializer = self.serializer_class(
            data=data
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
