from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from models import User
from database import engine, Base, get_db
from models import Contract, Point

app = FastAPI(title="ACBC Backend", version="1.0")

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "ACBC Backend Running Successfully"}

# ==========================
# CONTRACT APIs
# ==========================

@app.get("/contracts")
def get_contracts(db: Session = Depends(get_db)):
    return db.query(Contract).all()

@app.post("/contracts")
def create_contract(data: dict, db: Session = Depends(get_db)):
    contract = Contract(
        name=data["name"],
        start_date=data["start_date"],
        end_date=data["end_date"]
    )
    db.add(contract)
    db.commit()
    db.refresh(contract)
    return {"message": "Contract Created Successfully", "data": contract}

@app.put("/contracts/{contract_id}")
def update_contract(contract_id: int, data: dict, db: Session = Depends(get_db)):
    contract = db.query(Contract).filter(Contract.id == contract_id).first()
    if not contract:
        raise HTTPException(status_code=404, detail="Contract not found")
    contract.name = data["name"]
    contract.start_date = data["start_date"]
    contract.end_date = data["end_date"]
    db.commit()
    db.refresh(contract)
    return {"message": "Contract Updated Successfully"}

@app.delete("/contracts/{contract_id}")
def delete_contract(contract_id: int, db: Session = Depends(get_db)):
    contract = db.query(Contract).filter(Contract.id == contract_id).first()
    if not contract:
        raise HTTPException(status_code=404, detail="Contract not found")

    # ✅ Delete linked points first to avoid foreign key violation
    db.query(Point).filter(Point.contract_id == contract_id).delete()

    db.delete(contract)
    db.commit()
    return {"message": "Contract Deleted Successfully"}

# ==========================
# POINT APIs
# ==========================

@app.get("/points")
def get_points(db: Session = Depends(get_db)):
    return db.query(Point).all()

@app.post("/points")
def create_point(data: dict, db: Session = Depends(get_db)):
    point = Point(
        contract_id=data["contract_id"],
        point_name=data["point_name"],
        value=data["value"]
    )
    db.add(point)
    db.commit()
    db.refresh(point)
    return {"message": "Point Created Successfully", "data": {
        "id": point.id,
        "contract_id": point.contract_id,
        "point_name": point.point_name,
        "value": point.value
    }}

@app.put("/points/{point_id}")
def update_point(point_id: int, data: dict, db: Session = Depends(get_db)):
    point = db.query(Point).filter(Point.id == point_id).first()
    if not point:
        raise HTTPException(status_code=404, detail="Point not found")
    point.contract_id = data["contract_id"]
    point.point_name = data["point_name"]
    point.value = data["value"]
    db.commit()
    db.refresh(point)
    return {"message": "Point Updated Successfully"}

@app.delete("/points/{point_id}")
def delete_point(point_id: int, db: Session = Depends(get_db)):
    point = db.query(Point).filter(Point.id == point_id).first()
    if not point:
        raise HTTPException(status_code=404, detail="Point not found")
    db.delete(point)
    db.commit()
    return {"message": "Point Deleted Successfully"}

# ==========================
# LOGIN APIs
# ==========================

from pydantic import BaseModel

class UserLogin(BaseModel):
    username: str
    password: str

@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(
        User.username == user.username,
        User.password == user.password
    ).first()
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return {
        "message": "Login successful",
        "username": db_user.username,
        "role": db_user.role
    }