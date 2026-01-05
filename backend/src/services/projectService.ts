import { prisma } from '../config/database';

export const ProjectService = {
  getUserProjects(userId: string) {
    return prisma.project.findMany({ where: { userId } });
  },

  getProjectById(id: string, userId: string) {
    return prisma.project.findFirstOrThrow({ where: { id, userId } });
  },

  createProject(userId: string, data: any) {
    return prisma.project.create({ data: { ...data, userId } });
  },

  updateProject(id: string, userId: string, data: any) {
    return prisma.project.update({
      where: { id },
      data,
    });
  },

  deleteProject(id: string, userId: string) {
    return prisma.project.delete({ where: { id } });
  },
};
