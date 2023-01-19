from sqlalchemy import Boolean, Column, Integer, String, Float, ForeignKey,DATETIME,DateTime,ARRAY
from orm_interface.base import Base
from sqlalchemy.orm import relationship

class ProjectFinder_User(Base):
    __tablename__ = "projectfinder_user"
    id = Column(Integer, ForeignKey('user.id'), primary_key= True)
    firstname = Column(String)
    lastname = Column(String)
    email = Column(String)
    password = Column(String)
    profile_image= Column(String)
    degree=Column(String)
    description= Column(String)
    birthday = Column(String)
    skills = Column(ARRAY(String))

    

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

  

class Projects(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String)
    faculty= Column(String)
    description= Column(String)
    degree= Column(String)
    max_members= Column(Integer)
    status = Column(String)
    link = Column(String)
    skills = Column(ARRAY(String))
    type = Column(String)
    user_id = Column(Integer, ForeignKey('user.id'))
    membership = relationship('Membership', backref='projects',cascade="all, delete", passive_deletes=True)
    discussion = relationship('Discussion', backref='projects',cascade="all, delete", passive_deletes=True)


    def __init__(self, title, faculty, description, degree, status,max_members,user_id, link, skills, type):
        self.title = title
        self.faculty = faculty
        self.description = description
        self.degree = degree
        self.user_id = user_id
        self.status = status
        self.max_members= max_members
        self.link = link
        self.skills = skills
        self.type = type

class Membership(Base):
    __tablename__ = "membership"
    id = Column(Integer,primary_key=True, autoincrement=True)
    user_id  = Column(Integer, ForeignKey('user.id'))
    project_id = Column(Integer, ForeignKey('projects.id', ondelete='CASCADE'))
    status = Column(String)

    def __init__(self,project_id, user_id, status):
        self.user_id = user_id
        self.project_id= project_id
        self.status = status


class Discussion(Base):
    __tablename__ = "discussion"
    id = Column(Integer, primary_key=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey('projects.id', ondelete='CASCADE'))
    user_id = Column(Integer, ForeignKey('user.id'))
    created_at = Column(DateTime)
    description = Column(String)
    children = Column(String)

    def __init__(self,project_id, user_id, created_at, description,children):
        self.project_id= project_id
        self.user_id = user_id
        self.created_at = created_at
        self.description = description
        self.children = children



    