from flask import Blueprint, request, jsonify
import os
from orm_interface.base import Base, Session, engine
from orm_interface.entities.project_finder.projectfinder import Projects, Membership, Discussion
from orm_interface.entities.user import User
from .extensions import bcrypt
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity

project_finder = Blueprint("project_finder", __name__)

Base.metadata.create_all(engine)
session = Session()
project_finder = Blueprint("project_finder", __name__)





#ADD a Project to the DataBase
@project_finder.route("/post_project", methods=['POST'])
@jwt_required(optional=False)
def post_project(): 
    data = request.get_json()
    title = data["title"]
    faculty = data["faculty"]
    description = data["description"]
    degree = data["degree"]
    # status= data["enteredStatus"]
    max_members = data["maxMembers"]
    # projecttype = data["enteredType"]
    skills = data["skills"]
    # link = data["enteredLink"]
    current_user = get_jwt_identity()
    current_user_id = current_user["id"]  
    project = session.query(Projects).filter(Projects.title == title).first()
    if project is None:
        new_project = Projects(title=title,faculty=faculty,
        description=description,
        degree=degree, 
        max_members=max_members,status='',link= '', skills=skills,type='',
         user_id=current_user_id)
        session.add(new_project)
        session.commit()
        
        return jsonify({"sucess":"project posted"})
    else:
         return jsonify({"failed": "project already there"})

#Join Project
@project_finder.route("/memberships/projects/<int:id>", methods=['POST'])
def join_project(id=None): 
    data = request.get_json()
    user_id = data["userId"]  
    project_id = id
    status="pending"
    membership = session.query(Membership).filter(Membership.user_id == user_id).first()
    if (membership is None or membership):
        new_membership = Membership(user_id=user_id,project_id=project_id,status=status)
        session.add(new_membership)
        session.commit()
        return jsonify({"success":"Member request Sent"})

    else:
        return jsonify({"failed": "you cannot join are already a member"})


#update Application Request
@project_finder.route("/memberships/<int:id>", methods=['PUT'])
def accept_application(id=None):
    data = request.get_json()
    status = data['status']
    membership = session.query(Membership).filter(Membership.id== id)
    membership.update({Membership.status:status},synchronize_session=False)   
    session.commit()

    return 'sucess'

#Remove Application Request
@project_finder.route("/memberships/<int:id>", methods=['DELETE'])
def remove_application(id=None):
    session.query(Membership).filter(Membership.id== id).delete()
       
    session.commit()

    return 'sucess'
   


#Get ProjectMembershipList
@project_finder.route("/memberships/projects/<int:id>", methods=['GET'])
def get_membership_list(id=None):
    if request.method == 'GET':
     users= session.query(User).join(Membership).where(Membership.project_id==id).all()
     #.all()
     response= [] 
     for i in users:
         for j in i.membership:
           response.append({'id': i.id,'lastname':i.lastname,'firstname':i.firstname, 'email': i.email,'description': i.description, 'foto':i.profile_image, 'skills': i.skills,
               'degree': i.degree, 'status':j.status, 'membershipId' : j.id, 'user': j.user_id,'project_id': j.project_id })        
    return jsonify(response)

                
#GetProjectMembers
@project_finder.route("/get_project_members/<int:id>", methods=['GET'])
def get_project_members(id=None):
    if request.method == 'GET':
         users= session.query(User).join(Membership).filter(Membership.project_id==id).all()
         response=[] 
    for i in users:      
     response.append({
          'firstname':i.firstname,
        'lastname':i.lastname,
        'email':i.email,
        'skills':i.skills,
        'profile_image':i.profile_image,
        'degree':i.degree,
        'birthday': i.birthday,
        'id':i.id,
        'description':i.description})

    return jsonify(response)


#Get UserProjectMembershipList
@project_finder.route("/memberships/users/<int:id>", methods=['GET'])
def get_user_Project_membership(id=None):
    if request.method == 'GET':
        projects = session.query(Projects).join(Membership).filter(Membership.user_id == id).all()
        response = []
        for i in projects:
            response.append({'id': i.id,
            'title': i.title,'faculty':i.faculty,
        'description':i.description,
        'degree':i.degree,
        'skills': i.skills,
        'maxMembers': i.max_members,
        'createdBy':i.user_id,
        'type': i.type})

        return jsonify(response)

#Get AcceptedUserProjects
@project_finder.route("/project/users/", methods=['GET'])
@jwt_required(optional=False)
def get_Accepted_user_Projects(id=None):
    if request.method == 'GET':
        current_user = get_jwt_identity()
        current_user_id = current_user["id"]
        projects = session.query(Projects).join(Membership).filter(Membership.user_id == current_user_id).where(Membership.status== 'accepted')
        response = []
        for i in projects:
            response.append({'id': i.id,
            'title': i.title,'faculty':i.faculty,
        'description':i.description,
        'degree':i.degree,
        'skills': i.skills,
        'maxMembers': i.max_members,
        'createdBy':i.user_id,
        'type': i.type})

        return jsonify(response)

#Get Project  Team Members
@project_finder.route("/projectTeamMembers/<int:id>", methods=['GET'])
def get_Project_Team_Members(id=None):
    if request.method == 'GET':
        users = session.query(User).join(Membership).filter(Membership.project_id == id).where(Membership.status == 'accepted')
        response = []
        for i in users:
            response.append({'id': i.id, 'firstname': i.firstname, 'lastname': i.lastname})

        return jsonify(response)

 #Get Rejected Project  Team Members
# @project_finder.route("/rejectedTeamMembers/<int:id>", methods=['GET'])
# def get_Rejected_Team_Members(id=None):
#     if request.method == 'GET':
#         users = session.query(User).join(Membership).filter(Membership.project_id == id).where(Membership.status == 'rejected')
#         response = []
#         for i in users:
#             response.append({'id': i.id, 'firstname': i.firstname, 'lastname': i.lastname})

#         return jsonify(response)       

    






#Get Projects from Database
@project_finder.route("/get_projects", methods=['GET'])
def get_projects():      
    projects = session.query(Projects).all()   
    response= []
    #get all the data from data base with join ! 
    for i in projects:
        response.append({"id":i.id,
        'title':i.title,
        'faculty':i.faculty,
        'description':i.description,
        'degree':i.degree,
        'skills': i.skills,
        'maxMembers': i.max_members,
        'createdBy':i.user_id,
        'type': i.type
        })

    return jsonify(response)


# Get users by ID
@project_finder.route('/profile/<int:id>')
def getUser_by_id(id=None):
    user = session.query(User).where((User.id)== id)
    response=[]
    for i in user:
        response.append({"id":i.id,
        'firstname':i.firstname,
        'lastname':i.lastname,
        'email':i.email,
        'profile_image':i.profile_image,
        'degree':i.degree,
        'birthday': i.birthday,
        'description':i.description})

    return jsonify(response)  

   
#modify on cascade delete   
# Delete Project  from DataBase
@project_finder.route('/deleteProject/<int:id>', methods=['GET', 'DELETE'])
def delete_project_by_id(id=None):
    if request.method == 'DELETE':
        session.query(Projects).where((Projects.id)==id).delete()
        session.commit()
        print('deleted')
        
        return 'Project Deleted'

    else: return 'invalid request'
  

# add authentication
# Edit a Project
@project_finder.route('/editProject/<int:id>', methods=['GET', 'PUT'])
@jwt_required(optional=False)
def edit_project_by_id(id=None):
    if request.method == 'PUT':
        data = request.get_json()
        title = data["title"]
      
        faculty = data["faculty"]
        description = data["description"]
        degree = data["degree"]
        status= ''
        max_members = data["maxMembers"]
        projecttype = ''
        skills = data["skills"]
        link = ''
        
        project = session.query(Projects).filter(Projects.id== id)
        project.update({Projects.title:title},synchronize_session=False)
        project.update({Projects.faculty:faculty},synchronize_session=False)
        project.update({Projects.description:description},synchronize_session=False)
        project.update({Projects.degree:degree},synchronize_session=False)
        project.update({Projects.status:status},synchronize_session=False)
        project.update({Projects.max_members:max_members},synchronize_session=False)
        project.update({Projects.type:projecttype},synchronize_session=False)
        project.update({Projects.skills:skills},synchronize_session=False)
        project.update({Projects.link:link},synchronize_session=False)
         
        session.commit()
        
        return jsonify({"sucesss": "project edited"})
    else:
         return jsonify({"failed": "project not edited"})


# Edit a Profile
@project_finder.route('/editProfile/<int:id>', methods=['GET', 'PUT'])
@jwt_required(optional=False)
def edit_profile(id=None):
    if request.method == 'PUT':
        data = request.get_json()
        degree= data["degree"]
        foto= data["foto"]
        about= data["about"]
        skills = data["skills"]

        print(skills)
 

        # skill = skills.skills


        user = session.query(User).filter(User.id== id)
        user.update({User.degree:degree},synchronize_session=False)
        user.update({User.description:about},synchronize_session=False)
        user.update({User.skills:skills},synchronize_session=False)
        user.update({User.profile_image:foto},synchronize_session=False)
         
        session.commit()
        
        return jsonify({"sucesss": "project edited"})
    else:
         return jsonify({"failed": "project not edited"})







#create a Comment 
@project_finder.route("/discussions/projects/<int:id>", methods=['POST'])
def create_comment(id= None): 
    data = request.get_json()
    description = data["body"]["comment"]
    created_at = data["body"]["created_at"]
    user = data["owner"]
    parent = data['parent']


   
    discussion = session.query(Discussion).filter(Discussion.description == description).first()
    if discussion is None:
        new_discussion = Discussion(project_id=id, user_id=user,created_at=created_at, description=description, children= parent)
        session.add(new_discussion)
        session.commit()
        
        return jsonify({"sucess":"discussion posted"})
    else:
         return jsonify({"failed": "project already there"})



#Get comments
@project_finder.route("/discussions/projects/<int:id>")
def get_comment(id= None):
    comment = session.query(User).join(Discussion).where(Discussion.project_id ==id )
    
    
    response=[]
    for i in comment:
      for j in i.discussion:

           response.append({"id":j.id,
        'user_id':j.user_id,
        'project_id': j.project_id,
        'created_at':j.created_at,
        'children': j.children,
        'description':j.description,
        'firstname': i.firstname,
        'lastname': i.lastname
        })


    return jsonify(response)





#GetLogged in UserId
@project_finder.route("/home")
@jwt_required(optional=False)
def getLoggedInUserId():
    current_user = get_jwt_identity()
    current_user_id = current_user["id"]
    
    user = session.query(User).where((User.id)==current_user_id)
    response=[]
    for i in user:
        response.append({"id":i.id,
        'firstname':i.firstname,
        'lastname':i.lastname,
        'email':i.email,
        'profile_image':i.profile_image,
        'degree':i.degree,
        'birthday': i.birthday,
        'description':i.description,
        'skills': i.skills})

    return jsonify(response)


# Get project by ID
@project_finder.route('/projects/<int:id>')
def get_by_id(id=None):
    project = session.query(Projects).where((Projects.id)== id)
    
    response=[]
    for i in project:
        response.append({"id":i.id,
        'title':i.title,
        'faculty':i.faculty,
        'description':i.description,
        'degree':i.degree,
        'max_members': i.max_members,
        'status': i.status,
        'createdBy': i.user_id,
        "type":i.type,
        'link': i.link,
        'skills': i.skills,
        'user_id': i.user_id
        })

    return jsonify(response)

#Get Projects by UserID

@project_finder.route('/projectsUser/<int:user_id>')
@jwt_required(optional=False)
def get_by_user_id(user_id= None):
    current_user = get_jwt_identity()
    current_user_id = current_user["id"]  
   
    projects = session.query(Projects).where((Projects.user_id)== current_user_id)
   
    response=[]
    for i in projects:
        response.append({"id":i.id,
        'title':i.title,
        'faculty':i.faculty,
        'description':i.description,
        'degree':i.degree,
        'max_members': i.max_members,
        'status': i.status,
        'createdBy': i.user_id,
        "type":i.type,
        'link': i.link,
        'skills': i.skills,
        'user_id':i.user_id

        })

    return jsonify(response)



basedir = os.path.abspath(os.path.dirname(__file__))
    
