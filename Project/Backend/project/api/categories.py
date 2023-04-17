from . import models

def getCertainCategory(category_name):
    if(category_name == "resistor"):
        return models.Resistor.objects.all()
    elif(category_name == "capacitor"):
        return models.Capacitor.objects.all()
    elif(category_name == "transistor"):
        return models.Transistor.objects.all()
    elif(category_name == "inductor"):
        return models.Inductor.objects.all()
    elif(category_name == "diode"):
        return models.Diode.objects.all()
    elif(category_name == "ic"):
        return models.IC.objects.all()
    elif(category_name == "wire"):
        return models.Wire.objects.all()
    elif(category_name == "connector"):
        return models.Connector.objects.all()
    elif(category_name == "power"):
        return models.Power.objects.all()
    elif(category_name == "memory"):
        return models.Memory.objects.all()

