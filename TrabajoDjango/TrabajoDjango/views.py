from django.http import HttpResponse
from django.shortcuts import render
from AppTrabajo.models import Madre,Padre,Hermano
from django.template import Template,Context
import datetime

def Integrantes(request):
        time=datetime.datetime.now()
        diccionario={"Madre":"Ana","Apellido1":"Maresca","Edad1":37,
                     "Padre":"Marcelo","Apellido2":"Rivero","Edad2":42,
                     "Hermano":"Facundo","Apellido3":"Rivero","Edad3":17,
                     "fecha":time}
                     
        Mother= Madre (nombre="Ana",apellido="Maresca",edad=37,dia=time)
        Mother.save()
        Father= Padre (nombre="Marcelo",apellido="Rivero",edad=42,dia=time)
        Father.save()
        Son= Hermano (nombre="Facundo",apellido="Rivero",edad=17,dia=time)        
        Son.save()


        archivo=open("C:/Users/Santi/TrabajoDjango/Plantillas/template.html")
        
        template=Template(archivo.read())
        archivo.close()
        contexto=Context(diccionario)
        documento=template.render(contexto)

        return HttpResponse(documento)