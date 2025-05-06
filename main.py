from uvicorn import run
from app.app import app

def main():
    run(app="main:app", reload=True, workers=2)


if __name__ == "__main__":
    main()


