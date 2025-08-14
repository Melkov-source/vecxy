class DIContainer {
    private dependencies = new Map<string, any>();

    public register<T>(token: string, instance: T) {
        this.dependencies.set(token, instance);
    }

    public resolve<T>(token: string): T {
        const instance = this.dependencies.get(token);
        
        if (!instance) {
            throw new Error(`Dependency '${token}' not found`);
        }
        return instance;
    }
}

export const diContainer = new DIContainer();
