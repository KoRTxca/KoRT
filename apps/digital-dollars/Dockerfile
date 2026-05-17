FROM python:3.10-slim

WORKDIR /app

RUN pip install --no-cache-dir fastapi uvicorn httpx pydantic

COPY ledger_service.py .

EXPOSE 8099

CMD ["python", "ledger_service.py"]
