# Prompt de desarrollo: Plataforma Web de Análisis de Resiliencia de Infraestructura Gubernamental (OSINT + Simulación Docker)

## Contexto del proyecto

Desarrolla una **aplicación web educativa y de demostración** que analice, de forma **pasiva y ética**, la dependencia de infraestructura crítica gubernamental mexicana (SPEI, SAT, IMSS) hacia proveedores de nube extranjeros, modele amenazas sistémicas y demuestre el impacto mediante un **laboratorio de simulación en Docker** conectado en tiempo real a la interfaz web.

**Restricciones éticas y legales (obligatorias):**
- No realizar pruebas activas, escaneo agresivo ni pentesting contra dominios reales del gobierno.
- Toda la Fase 1 debe usar **OSINT pasivo** (DNS público, certificados públicos, WHOIS, BGP/ASN públicos, documentación oficial).
- Los datos sensibles deben ser **sintéticos o de demostración**.
- Incluir disclaimer visible: *"Entorno educativo. No se ataca infraestructura real."*

---

## Objetivo general

Construir una plataforma con dos componentes integrados:

1. **Frontend + Backend Web** — dashboard analítico, reportes, visualizaciones y control del laboratorio.
2. **Entorno de simulación Docker** — microservicios que emulan servicios gubernamentales, nube soberana vs extranjera, y chaos engineering, **expuesto vía API/WebSocket** al backend web.

---

## Arquitectura de alto nivel

```
┌─────────────────────────────────────────────────────────────┐
│                    APLICACIÓN WEB                            │
│  React/Next.js + Dashboard + Reportes PDF + Control Panel   │
└──────────────────────────┬──────────────────────────────────┘
                           │ REST API + WebSocket
┌──────────────────────────▼──────────────────────────────────┐
│                    BACKEND (FastAPI / Node.js)               │
│  - Orquestador OSINT                                         │
│  - Motor de modelado de amenazas                             │
│  - Cliente del laboratorio Docker                            │
│  - Generador de reportes                                     │
└──────────────────────────┬──────────────────────────────────┘
                           │ Docker API / Red interna
┌──────────────────────────▼──────────────────────────────────┐
│              ENTORNO DOCKER (docker-compose)                 │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────┐ │
│  │ Microserv.  │  │ Nube         │  │ Nube extranjera     │ │
│  │ SPEI/SAT/   │◄─┤ soberana     │  │ simulada (AWS/GCP   │ │
│  │ IMSS mock   │  │ (OpenStack/  │  │ mock containers)    │ │
│  └─────────────┘  │  local stack)│  └─────────────────────┘ │
│         ▲         └──────────────┘            ▲               │
│         │              Chaos Engine           │               │
│         └──────── Kali/Audit + tc/netem ──────┘               │
└─────────────────────────────────────────────────────────────┘
```

---

## Stack tecnológico sugerido

| Capa | Tecnología |
|------|------------|
| Frontend | Next.js 14+, TypeScript, Tailwind, shadcn/ui, Recharts/D3 |
| Backend | FastAPI (Python) o NestJS |
| Base de datos | PostgreSQL + Redis (cache/colas) |
| OSINT | Python: `dnspython`, `whois`, `crt.sh` API, `ipwhois`, `requests` |
| Simulación | Docker Compose, redes Docker personalizadas |
| Nube soberana simulada | OpenStack (DevStack) **o** stack ligero: MinIO + PostgreSQL + API Gateway local |
| Nube extranjera simulada | Contenedores mock con latencia artificial (`tc`, `netem`) |
| Chaos | Contenedor Kali o Alpine + `iptables`, `tc netem`, scripts Python |
| Tiempo real | WebSockets (Socket.io o FastAPI WebSockets) |
| Reportes | PDF con WeasyPrint o Puppeteer |

---

## Fase 1 — Reconocimiento y mapeo (OSINT)

### Funcionalidad web

Crear módulo **"Reconocimiento OSINT"** con:

**Entidades objetivo (configurables, no hardcodeadas agresivamente):**
- SPEI / Banco de México (dominios públicos relacionados)
- SAT (sat.gob.mx y subdominios públicos)
- IMSS (imss.gob.mx y subdominios públicos)

**Herramientas pasivas a integrar (backend):**

1. **DNS Mapping**
   - Registros A, AAAA, MX, NS, TXT, CNAME
   - Subdominios vía Certificate Transparency (crt.sh)
   - Visualización en grafo de dependencias DNS

2. **ASN / BGP Analysis**
   - Resolver IPs → ASN → organización propietaria
   - Clasificar si pertenecen a: AWS, GCP, Azure, Cloudflare, Akamai, proveedor nacional, etc.
   - Mapa geográfico de rangos IP (MaxMind GeoLite2 o ip-api)

3. **Certificados SSL**
   - Obtener certs vía conexión TLS pasiva o crt.sh
   - Mostrar emisor, SANs, fechas, CA

4. **Identificación de proveedores extranjeros**
   - Tabla cruzada: `Dominio → IP → ASN → Proveedor → País → ¿Extranjero?`
   - Alertas cuando servicios críticos resuelvan a rangos de nubes US/EU

5. **Análisis normativo**
   - Sección estática + editable con referencias a:
     - LFPDPPP (datos personales)
     - Normativa IMSS sobre datos de salud
     - Marco SAT / Banco de México sobre datos fiscales y financieros
     - Políticas de residencia de datos en contratos cloud públicos
   - Matriz: `Servicio | Tipo de dato | ¿Obligación territorial? | Evidencia normativa | Riesgo`

### UI requerida

- Dashboard con tarjetas por entidad (SPEI, SAT, IMSS)
- Grafo interactivo de infraestructura
- Mapa mundial de IPs detectadas
- Exportar reporte Fase 1 en PDF/JSON

### API endpoints ejemplo

```
POST /api/osint/scan          → iniciar escaneo pasivo
GET  /api/osint/results/{id}  → resultados
GET  /api/osint/providers     → proveedores detectados
GET  /api/osint/compliance    → matriz normativa
```

---

## Fase 2 — Modelado de amenazas (vulnerabilidades sistémicas)

### Funcionalidad web

Módulo **"Modelado de Amenazas"** basado en resultados OSINT + escenarios predefinidos:

**Escenarios a modelar:**

1. **Single Point of Failure (SPOF)**
   - Si X% de IPs dependen de un solo ASN/proveedor → calcular score de riesgo
   - Simular: "¿Qué servicios caen si AWS us-east-1 deja de responder?"

2. **Bloqueos geopolíticos**
   - Escenarios: sanciones, suspensión de cuenta cloud, embargo tecnológico
   - Matriz STRIDE adaptada a riesgo sistémico (no técnico)

3. **Latencia crítica (SPEI)**
   - Modelar latencia adicional por routing internacional
   - Umbral configurable (ej. >50ms degrada transacciones)
   - Gráfica: latencia local vs extranjera

**Visualizaciones:**
- Diagrama de arquitectura con nodos coloreados por riesgo
- Heatmap de concentración de proveedor
- Timeline de impacto en cascada
- Score global de resiliencia (0–100)

### API endpoints ejemplo

```
POST /api/threats/analyze     → analizar OSINT results
GET  /api/threats/scenarios   → escenarios disponibles
GET  /api/threats/risk-score  → score por entidad
```

---

## Fase 3 — Prueba de concepto (entorno Docker conectado a la web)

### Requisito crítico

El laboratorio Docker debe ser **controlable desde la web** y mostrar métricas en tiempo real.

### docker-compose.yml — servicios mínimos

```yaml
services:
  # --- Microservicios gubernamentales simulados ---
  spei-mock:
    # API de transferencias con latencia medible
  sat-mock:
    # Servicio fiscal simulado (consulta RFC dummy)
  imss-mock:
    # Servicio salud simulado (expediente sintético)
  
  # --- Nube soberana (local) ---
  sovereign-cloud:
    # OpenStack DevStack LITE o: postgres + minio + api-gateway
  sovereign-db:
    # Datos sensibles SOLO aquí
  
  # --- Nube extranjera simulada ---
  foreign-cloud-mock:
    # Servicio con label "aws-sim" / "gcp-sim"
  foreign-compute:
    # Procesamiento elástico simulado
  
  # --- Chaos Engineering ---
  chaos-engine:
    # Kali/Alpine con privilegios NET_ADMIN
    # Scripts: block_foreign.sh, delay_traffic.sh, partition_network.sh
  
  # --- Observabilidad ---
  prometheus:
  grafana:
  
  # --- API del laboratorio ---
  lab-api:
    # Expone control al backend web
    ports: ["8080:8080"]
```

### Redes Docker

- `sovereign-net` — red interna "nacional"
- `foreign-net` — red "extranjera" simulada
- `dmz-net` — microservicios gubernamentales
- Reglas de routing entre redes controladas por `chaos-engine`

### Simulación: Nube soberana vs extranjera

**Opción A (completa):** OpenStack DevStack en contenedor (pesado, documentar requisitos 16GB+ RAM)

**Opción B (recomendada para demo):** Stack soberano ligero:
- PostgreSQL local = datos IMSS/SAT sensibles
- Redis local = cola SPEI
- MinIO local = almacenamiento documentos
- Contenedor `foreign-cloud-mock` = API de cómputo/analytics con latencia 80–200ms artificial

### Chaos Engineering — scripts controlables desde web

Desde panel web, botones que ejecuten vía `lab-api`:

| Acción | Efecto simulado |
|--------|-----------------|
| `block_foreign_cloud` | iptables DROP hacia foreign-net |
| `submarine_cable_cut` | netem delay 5000ms + 30% loss |
| `provider_outage` | docker stop foreign-cloud-mock |
| `geopolitical_sanction` | bloqueo + rechazo HTTP 451 |
| `restore_all` | revertir reglas, reiniciar servicios |

### Métricas en tiempo real (WebSocket → frontend)

- Estado de cada microservicio (UP/DEGRADED/DOWN)
- Latencia p50/p95/p99 SPEI mock
- Transacciones fallidas / cola acumulada
- Pérdida de sincronización de datos
- Logs de cascada de fallos

### UI del laboratorio

- Panel de control con botones de chaos
- Topología en vivo (nodos cambian de color)
- Gráficas Prometheus embebidas o via Grafana iframe
- Botón **"Iniciar demo completa"** (secuencia automatizada de fallo → cascada → recuperación)

### API del laboratorio

```
POST /lab/chaos/{action}
GET  /lab/status
GET  /lab/metrics
WS   /lab/stream
POST /lab/reset
```

El **backend web** actúa como proxy seguro hacia `lab-api` (no exponer Docker socket al frontend).

---

## Fase 4 — Propuesta de resiliencia

### Funcionalidad web

Módulo **"Propuesta de Mitigación"** generado automáticamente post-simulación:

**Contenido del reporte:**

1. **Arquitectura Multi-Cloud e Híbrida (diagrama editable)**
   - Tier 1 (soberano/on-prem): datos IMSS, registros SAT, núcleo SPEI
   - Tier 2 (híbrido): réplicas, backup, DR site nacional
   - Tier 3 (extranjero): ML no crítico, CDN estático, burst compute

2. **Modelo de responsabilidad compartida**
   - Diagrama: Gobierno vs Proveedor vs Integrador
   - RACI de continuidad del negocio

3. **Plan de contingencia**
   - RTO/RPO objetivo por servicio
   - Failover automático a nube soberana
   - Runbooks enlazados

4. **Recomendaciones priorizadas**
   - Crítico / Alto / Medio / Bajo
   - Esfuerzo vs impacto (matriz 2x2)

### Exportables

- PDF ejecutivo para jurado
- PDF técnico con diagramas
- JSON de arquitectura target

---

## Estructura del repositorio

```
/proyecto-resiliencia-gob
├── web/
│   ├── frontend/          # Next.js
│   └── backend/           # FastAPI
├── lab/
│   ├── docker-compose.yml
│   ├── services/
│   │   ├── spei-mock/
│   │   ├── sat-mock/
│   │   ├── imss-mock/
│   │   ├── sovereign-cloud/
│   │   ├── foreign-cloud-mock/
│   │   └── lab-api/
│   ├── chaos/
│   │   ├── block_foreign.sh
│   │   ├── delay_traffic.sh
│   │   └── partition.sh
│   └── monitoring/
│       ├── prometheus.yml
│       └── grafana/
├── docs/
│   ├── ARCHITECTURE.md
│   ├── ETHICS.md
│   └── DEMO_SCRIPT.md     # Guión para presentación a jurado
├── .env.example
└── README.md
```

---

## Requisitos no funcionales

- **Idioma UI:** Español (México)
- **Responsive:** usable en laptop para demo presencial
- **Tiempo de escaneo OSINT:** async con barra de progreso
- **Lab startup:** `docker compose up` en < 3 min (modo lite)
- **Seguridad:** lab-api con token; sin exponer Docker socket al browser
- **Modo demo:** datos precargados si OSINT falla (fallback offline)

---

## Entregables

1. Aplicación web funcional con 4 módulos (OSINT, Amenazas, Laboratorio, Resiliencia)
2. `docker-compose.yml` funcional conectado al backend
3. Panel de chaos engineering operable desde browser
4. Reportes PDF exportables
5. README con instrucciones de instalación
6. Guión de demo de 10 minutos para jurado
7. Disclaimer legal/ético visible

---

## Criterios de aceptación (Definition of Done)

- [ ] Escaneo OSINT pasivo de al menos 3 entidades con resultados visualizados
- [ ] Score de riesgo calculado automáticamente
- [ ] Laboratorio Docker levanta con un comando
- [ ] Botón web "Cortar nube extranjera" provoca fallo visible en SPEI mock
- [ ] WebSocket muestra cascada de fallos en < 5 segundos
- [ ] Reporte PDF Fase 4 generado con arquitectura híbrida propuesta
- [ ] Todo el flujo demo funciona sin internet (modo offline)

---

## Orden de implementación sugerido

1. Scaffold web (frontend + backend + DB)
2. docker-compose con mocks básicos + lab-api
3. Conexión web ↔ lab (status + chaos básico)
4. Módulo OSINT pasivo
5. Módulo modelado de amenazas
6. Chaos scripts avanzados + métricas Prometheus
7. Módulo resiliencia + export PDF
8. Pulido UI, demo script, documentación

---

## Nota para el agente desarrollador

Prioriza una **demo impresionante y estable** sobre perfección académica. OpenStack completo es opcional; un stack soberano ligero es aceptable si está bien documentado como simulación. El valor ante jurado está en: **datos OSINT reales (pasivos) + simulación visual de caída en cascada + propuesta concreta de arquitectura híbrida**.
