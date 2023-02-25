## ProjeX

<p align="center">
<img height="250px" src="https://i.ibb.co/FxtQWM8/projex-logo.png" alt="Projex-logo"> </br>
</p>
<br/>

 <p>
The goal of this project is to give Students a plattform for making Project/ Project Members search a walk in the Park. ProjeX is an application built with React Library, Flask api for Backend and PostgreSQL for Database.
</p>

## Project Architecture

![image](https://i.ibb.co/2thvFNb/structure.png)

## Some Projex screenshots

![image](https://i.imgur.com/KRzMkwt.png)

- Dashbord

![image](https://i.imgur.com/NUM2PIC.png)

- Edit Project Applications

### 🚀 Get Started / Installation Guide

1. Manual Installation Guide 🔨

   - Backend installation

     - Download and install [Python 3.10.4](https://www.python.org/downloads/)
       and [PostgreSQL 14.2](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

     - Open a command prompt, move inside `backend` folder, and follow the steps below by typing the commands in your
       command prompt

       - Install a python virtual environment

         ```
         python -m venv venv
         ```

       - Activate the python virtual environment

         ```
         .\venv\Scripts\activate
         ```

       - Upgrade the pip version

         ```
         python -m pip install --upgrade pip
         ```

       - Install the required packages from the `requirements.txt` file

         ```
         pip install -r requirements.txt           # For Linux/MacOS
         pip install -r requirements-windows.txt   # For Windows


         ```

     # You may need to manually install some dependencies.

     - Rename the files `example.env` to `.env` and `example.flaskenv` to `.flaskenv` respectively

     - Open `.env` file, find `POSTGRES_PASS`, and type the password of your postgresql database between the single
       quotation mark

     - Type the following command in a command prompt to run server

       ```
       python -m flask run --host=0.0.0.0
       ```

   - Frontend installation

     - Download and install [NodeJS](https://nodejs.org/en/)

     - Move to `frontend` folder and rename the file `example.env` to `.env`

     - Open command prompt/terminal(Preferably as Admininstrator) and follow the steps below:

       - Download and install node packages

         ```
         npm install --force
         ```

       - Run the script and starts the application

         ```
         npm run dev
         ```

       - Stop the Frontend application by pressing `Cntl + c` inside the command prompt

       - Application will open automatically in browser at [localhost:3000](http://localhost:3000)

### ProjeX Members

- Tom Stolzenberg
- Ebube Jude Ebite
- Cedric Tala
- Sophie Meier
- Fernaz Khattab

## Links

- [ProjeX - Demo Link](https://youtu.be/gcR1sFUIEhY)
- [ProjeX - Advert Link](https://youtu.be/IiDwEyS1Zp4)

### Technologies

- [ReactJS](https://reactjs.org/docs/getting-started.html)
- [Material Design v4](https://v4.mui.com/getting-started/installation/)
- [NodeJS](https://nodejs.org/)
- Flask
- Postgres
