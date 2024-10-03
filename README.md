# task-manager-svc
Proyecto para la gestión de usuarios y tareas utilizando tecnologias Node.js con express y SQL Server. 

### Instrucciones para probar el servicio
1. Se debe clonar el repositorio:
https://github.com/HelenM24/task-manager-svc.git

2. Ejecuta el siguiente comando para instalar las dependencias del proyecto:
   npm install

3. El servicio debe probarse de manera manual, las configuraciones de la base de datos estan en la carpeta kit/platform/database.js
4. El script de la base esta en el archivo init.sql
5. El archivo principal del proyecto esta en cmd/api/app.js donde he incluido la instancia de swagger para mayor informacion de los endpoints.

### Consideraciones
Inicialmente se consideró el uso de Docker para la gestión del servicio, pero se encontró que la configuración no funcionó como se esperaba al intentar conectarse a la base de datos. Por lo tanto, el servicio debe probarse de manera manual, de igual forma decidi dejar los archivos como evidencia.