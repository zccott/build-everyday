from fastapi import FastAPI

app = FastAPI(title="Expense Management API")


app.include_router(expense.router)


@app.get("/")
def read_root():
    return {"Hello": "World"}