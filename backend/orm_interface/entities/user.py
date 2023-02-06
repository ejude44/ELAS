from sqlalchemy import Column, String,Integer
from orm_interface.base import Base
from sqlalchemy.orm import relationship
from orm_interface.entities.project_finder.projectfinder import ProjectFinder_User

class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, autoincrement=True)
    firstname = Column(String)
    lastname = Column(String)
    email = Column(String, unique=True)
    password = Column(String)
    projectfinder_user= relationship(ProjectFinder_User, overlaps="user")
   


    def __init__(self, firstname, lastname, email, password ):
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.password = password
       
