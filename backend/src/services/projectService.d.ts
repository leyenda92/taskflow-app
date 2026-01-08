export declare const ProjectService: {
    getUserProjects(userId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        userId: string;
    }[]>;
    getProjectById(id: string, userId: string): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        id: string;
        name: string;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createProject(userId: string, data: any): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        id: string;
        name: string;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateProject(id: string, userId: string, data: any): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        id: string;
        name: string;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteProject(id: string, userId: string): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        id: string;
        name: string;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
};
//# sourceMappingURL=projectService.d.ts.map