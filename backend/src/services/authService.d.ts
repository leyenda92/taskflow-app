export declare const AuthService: {
    register(data: any): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            password: string;
        };
        token: string;
    }>;
    login(email: string, password: string): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            password: string;
        };
        token: string;
    }>;
};
//# sourceMappingURL=authService.d.ts.map