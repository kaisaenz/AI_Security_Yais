from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="OSINT & Simulation Backend")

# Habilitar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import uuid
from osint import scan_target

# In-memory storage for demo purposes
scan_results = {}

@app.get("/")
def read_root():
    return {"message": "OSINT & Simulation Backend API is running"}

@app.post("/api/osint/scan")
def start_osint_scan(target: str):
    scan_id = str(uuid.uuid4())
    # In a real app this would be async (e.g. Celery), but for demo we do it synchronously
    result = scan_target(target)
    scan_results[scan_id] = result
    return {"scan_id": scan_id, "status": "completed"}

@app.get("/api/osint/results/{scan_id}")
def get_osint_results(scan_id: str):
    if scan_id in scan_results:
        return {"id": scan_id, "status": "completed", "data": scan_results[scan_id]}
    return {"error": "Scan not found", "status": "failed"}

@app.get("/api/osint/providers")
def get_providers():
    return {"providers": ["AWS", "Azure", "GCP", "Kio Networks", "Telmex", "Cloudflare"]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
