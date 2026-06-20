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

@app.get("/")
def read_root():
    return {"message": "OSINT & Simulation Backend API is running"}

@app.get("/api/osint/providers")
def get_providers():
    return {"providers": []}

@app.get("/api/osint/results/{id}")
def get_osint_results(id: str):
    return {"id": id, "status": "completed", "data": {}}

@app.post("/api/osint/scan")
def start_osint_scan():
    return {"scan_id": "123", "status": "started"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
