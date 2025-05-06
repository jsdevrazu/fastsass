# Base Image
FROM python:3.13-slim

# Workdir
WORKDIR /app

# Install uv
RUN pip install uv

# Generate uv.lock file
RUN uv pip freeze > uv.lock

# Copy lock file
COPY uv.lock uv.lock

# Install dependencies from lock
RUN uv pip sync --system uv.lock

# Copy source code
COPY . .

# Expose port
EXPOSE 8000

# Run app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
