import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/stores/useAuthStore';
import { apiService } from '@/services/api';
import { useApi } from '@/hooks/useApi';
import styles from './dashboard.module.css';

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const loadUserFromStorage = useAuthStore((state) => state.loadUserFromStorage);
  const router = useRouter();
  const { execute, loading, error } = useApi();

  const [projects, setProjects] = useState<{ name: string }[]>([]);
  const [newProject, setNewProject] = useState('');

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  useEffect(() => {
    if (!user) return;
    
    execute(() => apiService.getProjects(), {
      onSuccess: (data) => setProjects(data),
    });
  }, [user]);

  const handleCreate = async () => {
    if (!newProject) return;

    await execute(() => apiService.createProject({ name: newProject }), {
      onSuccess: (project) => {
        setProjects([...projects, project]);
        setNewProject('');
      },
    });
  };

  if (!user) return <div className={styles.loading}>Loading dashboard...</div>;
  if (loading) return <div className={styles.loading}>Cargando...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title} data-cy="dashboard-title">Dashboard</h1>

      <div className={styles.form}>
        <input
          data-cy="project-name"
          placeholder="Nombre del proyecto"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          className={styles.input}
        />
        <button
          data-cy="create-project-btn"
          onClick={handleCreate}
          disabled={loading}
          className={styles.button}
        >
          Crear
        </button>
      </div>

      <div data-cy="project-list" className={styles.projectList}>
        {projects.map((p, idx) => (
          <div key={idx} data-cy="project-item" className={styles.projectItem}>
            {p.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
