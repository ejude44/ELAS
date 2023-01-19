import { useState, useEffect } from 'react';
import {
  GetProjectsRequest,
  GetProjectRequest,
  DeleteProjectRequest,
  EditProjectRequest,
  CreateProjectRequest,
  ApplyRequest,
  GetProjectMembershipsRequest,
  AcceptApplicantRequest,
  RejectApplicantRequest,
  GetProjectTeamMembers,
  GetRejectedTeamMembers,
  RemoveApplicantRequest,
} from './requests';

import { useGetUserById } from '../user/hooks';

export function useProjects() {
  const [result, setProjects] = useState(null);

  const getProj = async () => {
    setProjects(await GetProjectsRequest());
  };

  useEffect(() => {
    getProj();
  }, []);

  return { result, projects: result?.data, getProj };
}

export function useProject(projectId) {
  const [result, setProject] = useState(null);

  const getProj = async () => {
    if (projectId) {
      setProject(await GetProjectRequest({ projectId }));
    } else {
      setProject(null);
    }
  };

  useEffect(() => {
    getProj();
  }, [projectId]);

  return { result, project: result?.data, getProj };
}

export function useDeleteProject() {
  const deleteProject = async (projectId) => {
    return await DeleteProjectRequest({ projectId });
  };

  return { deleteProject };
}

export function useEditProject() {
  const editProject = async (projectId, data, token) => {
    return await EditProjectRequest({ projectId, data, token });
  };

  return { editProject };
}

export function useCreateProject() {
  const createProject = async (data, token) => {
    return await CreateProjectRequest({ data, token });
  };

  return { createProject };
}

export function useApply(projectId, userId) {
  const [result, setResult] = useState(null);

  const apply = async () => {
    setResult(await ApplyRequest({ projectId, userId }));
  };

  return { apply, result };
}

export function useProjectMemberships(projectId) {
  const [result, setResult] = useState(null);

  const refetch = async () => {
    if (projectId) {
      setResult(await GetProjectMembershipsRequest({ projectId }));
    } else {
      setResult(null);
    }
  };

  useEffect(() => {
    refetch();
  }, [projectId]);

  return { result, memberships: result?.data, refetch };
}

export function useProjectTeamMembers(projectId) {
  const [result, setResult] = useState(null);

  const refetch = async () => {
    if (projectId) {
      setResult(await GetProjectTeamMembers({ projectId }));
    } else {
      setResult(null);
    }
  };

  useEffect(() => {
    refetch();
  }, [projectId]);

  return { result, teamMembers: result?.data, refetch };
}

export function useRejectedTeamMembers(projectId) {
  const [result, setResult] = useState(null);

  const refetch = async () => {
    if (projectId) {
      setResult(await GetRejectedTeamMembers({ projectId }));
    } else {
      setResult(null);
    }
  };

  useEffect(() => {
    refetch();
  }, [projectId]);

  return { result, rejectedMembers: result?.data, refetch };
}

export function useMyMembershipStatus(projectId, userId) {
  const { memberships, refetch } = useProjectMemberships(projectId);
  const { us } = useGetUserById(userId);

  // const [isMember, setIsMember] = useState(Boolean);
  const [status, setStatus] = useState(null);
  const [memId, setMemId] = useState(null);

  useEffect(() => {
    if (!memberships) {
      return;
    } else if (memberships) {
      const it = memberships.find(
        (me) => me.project_id == projectId && me.user == userId
      );

      if (it) {
        setMemId(it.membershipId);
        setStatus(it.status);
      }
      const membership = memberships.find(
        (membership) => membership.id == userId
      );

      if (membership) {
        return;
        // setStatus('Application sent');
      } else if (!membership) {
        setStatus('Send Application');
      }
    }
  }, [memberships, us, status, memId, refetch]);

  return { MEM: memberships, USER: us, status, memId, refetch };
}

export function useAcceptApplicant() {
  const accept = async (membershipId) => {
    return await AcceptApplicantRequest({ membershipId });
  };

  return { accept };
}

export function useRejectApplicant() {
  const reject = async (membershipId) => {
    return await RejectApplicantRequest({ membershipId });
  };

  return { reject };
}

export function useRemoveApplicant() {
  const remove = async (membershipId) => {
    return await RemoveApplicantRequest({ membershipId });
  };

  return { remove };
}
