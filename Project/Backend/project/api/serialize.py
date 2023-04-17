from rest_framework import serializers

from . import models

def getPluralSerialized(data, category_name):
    serialized = None

    if(category_name == "resistor"):
        serialized = ResistorSerializer(data, many=True)
    elif(category_name == "capacitor"):
        serialized = CapacitorSerializer(data, many=True)
    elif(category_name == "transistor"):
        serialized = TransistorSerializer(data, many=True)
    elif(category_name == "inductor"):
        serialized = InductorSerializer(data, many=True)
    elif(category_name == "diode"):
        serialized = DiodeSerializer(data, many=True)
    elif(category_name == "ic"):
        serialized = ICSerializer(data, many=True)
    elif(category_name == "wire"):
        serialized = WireSerializer(data, many=True)
    elif(category_name == "connector"):
        serialized = ConnectorSerializer(data, many=True)
    elif(category_name == "power"):
        serialized = PowerSerializer(data, many=True)
    elif(category_name == "memory"):
        serialized = MemorySerializer(data, many=True)

    return serialized.data

def getSingularSerialized(data, category_name):
    serialized = None

    if(category_name == "resistor"):
        serialized = ResistorSerializer(data)
    elif(category_name == "capacitor"):
        serialized = CapacitorSerializer(data)
    elif(category_name == "transistor"):
        serialized = TransistorSerializer(data)
    elif(category_name == "inductor"):
        serialized = InductorSerializer(data)
    elif(category_name == "diode"):
        serialized = DiodeSerializer(data)
    elif(category_name == "ic"):
        serialized = ICSerializer(data)
    elif(category_name == "wire"):
        serialized = WireSerializer(data)
    elif(category_name == "connector"):
        serialized = ConnectorSerializer(data)
    elif(category_name == "power"):
        serialized = PowerSerializer(data)
    elif(category_name == "memory"):
        serialized = MemorySerializer(data)

    return serialized.data

class ResistorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Resistor
        fields = "__all__"

class CapacitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Capacitor
        fields = "__all__"

class TransistorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Transistor
        fields = "__all__"

class InductorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Inductor
        fields = "__all__"

class DiodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Diode
        fields = "__all__"

class ICSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.IC
        fields = "__all__"

class WireSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Wire
        fields = "__all__"

class ConnectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Connector
        fields = "__all__"

class PowerSerializer(serializers.Serializer):
    voltage = serializers.FloatField()
    capacity = serializers.FloatField()

class MemorySerializer(serializers.Serializer):
    size = serializers.IntegerField()
    interface = serializers.CharField()