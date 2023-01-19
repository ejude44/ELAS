from sqlalchemy import Column, String,Integer,ARRAY
from orm_interface.base import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "user"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    firstname = Column(String)
    lastname = Column(String)
    email = Column(String)
    password = Column(String)
    profile_image= Column(String)
    degree=Column(String)
    description= Column(String)
    birthday = Column(String)
    skills = Column(ARRAY(String))
    projectfinder_user= relationship('ProjectFinder_User', backref='user')
    projects = relationship('Projects', backref='user')
    membership = relationship('Membership', backref='user')
    discussion = relationship('Discussion', backref='user')


    def __init__(self, firstname, lastname, email, password, degree,birthday,skills, description,profile_image):
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.password = password
        self.degree= degree
        self.birthday= birthday
        self.skills= skills
        self.description= description
        self.profile_image= profile_image
