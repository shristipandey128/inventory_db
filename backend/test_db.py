from sqlalchemy import create_engine, text

engine = create_engine(
    "postgresql://postgres:postgres@127.0.0.1:5433/inventorydb"
)

with engine.connect() as conn:
    print(conn.execute(text("SELECT current_database()")).scalar())