

def create_expense(db: Session, expense: ExpenseCreate) -> Expense:
    db_expense = Models.Expense(**expense.model_dump())
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)

    return db_expense

def get_expenses(db: Session) -> list[Expense]:
    return db.query(Models.Expense).all()