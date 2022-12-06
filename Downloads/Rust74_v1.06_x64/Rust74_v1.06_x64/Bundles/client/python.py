class Empleado():
      def __init__(self,nombre,edad,explab,sueldo):
          self.nombre = nombre
          self.edad = edad
          self.explab = explab
          self.sueldo = sueldo



class Gerente(Empleado):

      super(Empleado)
     
      def __init__(nombre1,edad1,explab1,sueldo1):
        print(f"Mi Cargo es {explab1}")
        
      

Gerente.__init__("Gerente","","Gerente","")
Empleado("Julian","23","2 Años","25000")