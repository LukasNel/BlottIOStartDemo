FROM python:3.7-slim
ENV PYTHONUNBUFFERED=1
WORKDIR /blottio
COPY . ./
RUN pip install -r requirements.txt
RUN python manage.py makemigrations
RUN python manage.py migrate
RUN python manage.py runserver 0.0.0.0:8000