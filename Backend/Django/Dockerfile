FROM python:3.8.12
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt 
EXPOSE 8000
COPY . /code/