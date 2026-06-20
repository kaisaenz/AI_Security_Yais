# Manual de Uso: ResilienceGov (Plataforma OSINT & Chaos Lab)

Este documento detalla el funcionamiento de la plataforma web de demostración para el análisis de resiliencia de infraestructura crítica.

## Arquitectura de la Solución
La plataforma se divide en 3 componentes que trabajan en conjunto:
1. **Frontend (Next.js / React)**: Interfaz gráfica moderna, accesible en `http://localhost:3000`.
2. **Backend (FastAPI / Python)**: Motor lógico, escáner pasivo (OSINT) y proxy hacia el simulador, corriendo en `http://localhost:8000`.
3. **Laboratorio Chaos (Docker)**: Microservicios en contenedores (Nube soberana, Nube extranjera, SPEI/SAT/IMSS Mocks) interconectados a través de redes virtuales simuladas.

---

## Módulos de la Interfaz Web

### 1. OSINT Pasivo (`/`)
Este es el panel principal de reconocimiento pasivo. 
- **¿Cómo funciona?**: Al introducir un dominio (ej. `banxico.org.mx`) y presionar "Escanear", el Backend (Python) consulta registros DNS (`A`, `MX`) de manera pasiva y obtiene las direcciones IP asociadas. Luego, usa servicios de geolocalización de IPs (ASN) para descubrir a qué ISP pertenece cada nodo y en qué país se hospeda.
- **Resultados**: Te muestra un panel con el total de IPs encontradas, el porcentaje que recae en nubes extranjeras (AWS, Azure, etc.), y te alerta si existe riesgo normativo al guardar datos críticos fuera del territorio nacional.

### 2. Modelado de Amenazas (`/threats`)
- **¿Cómo funciona?**: Lee en tiempo real el último escaneo exitoso del módulo OSINT y calcula el riesgo geopolítico.
- **Acciones**: Dependiendo del grado de dependencia extranjera (ej. > 50%), evalúa el nivel de riesgo en caso de bloqueos, pérdida de conectividad o cambios normativos en jurisdicciones foráneas. Expone los Puntos Únicos de Fallo (SPOF).

### 3. Laboratorio Chaos (`/lab`)
- **¿Cómo funciona?**: Este panel se conecta en tiempo real con los microservicios de Docker. Actúa como un inyector de Chaos Engineering.
- **Botones Interactivos**:
  - **Cortar Nube Extranjera**: Apaga virtualmente la red o deniega la conexión a los mocks de servicios extranjeros, forzando la API gubernamental a entrar en estado de degradación ("degraded"). Verás cómo el nodo se torna rojo al instante.
  - **Añadir Latencia**: Simula que un cable submarino se corta o el routing se vuelve lento (5000ms). Degradando instantáneamente el servicio en tiempo real.
  - **Restaurar Servicios**: Devuelve la topología de Docker a un estado óptimo (`online`).

### 4. Resiliencia / Reportes (`/reports`)
- **¿Cómo funciona?**: Te presenta una propuesta de Arquitectura Híbrida en tres capas (Tiers 1, 2 y 3) para mitigar los riesgos descubiertos, manteniendo los datos sensibles localmente (soberanía de datos) y delegando cargas pesadas/no críticas a la nube extranjera.
- **Botón Exportar**: Permite exportar toda esta estrategia y el estado actual de la plataforma a un archivo **PDF**. Al presionarlo, optimiza la pantalla para impresión sin elementos de UI estorbosos.

---

## Solución de Problemas (Troubleshooting)
- **El escáner OSINT no arroja datos**: Si escaneas y se queda "vacío", puede que el dominio no responda a Pings pasivos o que el servicio de geolocalización haya alcanzado su límite de capa gratuita. Intenta con un dominio grande como `google.com` o `sat.gob.mx`.
- **El Laboratorio no actualiza estado**: Asegúrate de que los contenedores estén corriendo. Abre una terminal en la carpeta `/lab` y ejecuta `docker compose up -d`.
- **El botón Configuración no se guarda**: Es una representación gráfica de la arquitectura propuesta; en este entorno demo, la API Key no es requerida ya que se utiliza un motor OSINT gratuito.
