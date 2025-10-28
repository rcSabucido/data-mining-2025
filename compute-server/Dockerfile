# syntax=docker/dockerfile:1

FROM python:3.13.5-slim-bookworm AS builder

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --upgrade setuptools

# For greenlet
RUN apt update
RUN apt install build-essential -y

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY *.py /app
COPY .env /app

RUN rm requirements.txt

WORKDIR /app

CMD ["gunicorn", "--worker-class=gevent", "--worker-connections=1000", "--workers=2", "--bind=0.0.0.0:54789", "app:app"]
