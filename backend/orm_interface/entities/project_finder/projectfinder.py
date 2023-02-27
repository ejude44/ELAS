from sqlalchemy import Column, Integer, String, ForeignKey,DateTime,ARRAY
from orm_interface.base import Base
from sqlalchemy.orm import relationship

# ProjexUser Table
class ProjectFinder_User(Base):
    __tablename__ = "projectfinder_user"
    id = Column(Integer,  autoincrement=True ,primary_key= True,unique=True)
    email = Column(String, ForeignKey('user.email'), unique=True)
    profile_image= Column(String)
    degree=Column(String)
    description= Column(String)
    birthday = Column(String)
    skills = Column(ARRAY(String))
    languageSkills = Column(ARRAY(String))
    user = relationship('User', backref='user')
    projects = relationship('Projects', backref='user')
    membership = relationship('Membership', backref='user')
    discussion = relationship('Discussion', backref='user')

    def __init__(self, email,degree,birthday,skills,languageSkills, description,profile_image):
        self.email= email
        self.degree= degree
        self.birthday= birthday
        self.languageSkills= languageSkills
        self.skills= skills
        self.description= description
        self.profile_image= profile_image


#  Projects Table
class Projects(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    title = Column(String)
    faculty= Column(String)
    description= Column(String)
    degree= Column(String)
    max_members= Column(Integer)
    link = Column(String)
    skills = Column(ARRAY(String))
    type = Column(String)
    user_id = Column(Integer, ForeignKey('projectfinder_user.id'))
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

# Membership Table
class Membership(Base):
    __tablename__ = "membership"
    id = Column(Integer,primary_key=True,autoincrement=True, unique= True)
    user_id  = Column(Integer, ForeignKey('projectfinder_user.id'), primary_key=True)
    project_id = Column(Integer, ForeignKey('projects.id', ondelete='CASCADE'),primary_key=True)
    status = Column(String)

    def __init__(self,project_id, user_id, status):
        self.user_id = user_id
        self.project_id= project_id
        self.status = status

# Discussion Table
class Discussion(Base):
    __tablename__ = "discussion"
    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    project_id = Column(Integer, ForeignKey('projects.id', ondelete='CASCADE'),primary_key = True)
    user_id = Column(Integer, ForeignKey('projectfinder_user.id'),primary_key=True)
    created_at = Column(DateTime)
    description = Column(String)
    children = Column(String)

    def __init__(self,project_id, user_id, created_at, description,children):
        self.project_id= project_id
        self.user_id = user_id
        self.created_at = created_at
        self.description = description
        self.children = children

    