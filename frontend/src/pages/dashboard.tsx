import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/stores/useAuthStore';
import { apiService } from '@/services/api';
import { useApi } from '@/hooks/useApi';
import styles from './dashboard.module.css';

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const loadUserFromStorage = useAuthStore((state) => state.loadUserFromStorage);
  const router = useRouter();
  const { execute, loading, error } = useApi();

  const [projects, setProjects] = useState<{ id: string; name: string }[]>([]);
  const [newProject, setNewProject] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'recent'>('asc');

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

  const handleDelete = async (id: string) => {
  if (!confirm('¿Seguro que quieres eliminar este proyecto?')) return;
  await execute(() => apiService.deleteProject(id), {
    onSuccess: () => {
      setProjects(projects.filter(p => p.id !== id));
    },
  });
};

  const handleEdit = (project: { id: string; name: string }) => {
    setEditingId(project.id);
    setEditName(project.name);
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editName) return;

    await execute(() => apiService.updateProject(editingId, { name: editName }), {
      onSuccess: (updated) => {
        setProjects(projects.map(p => p.id === editingId ? updated : p));
        setEditingId(null);
        setEditName('');
      },
    });
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const filteredProjects = projects
  .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  .sort((a, b) => {
    if (sortOrder === 'asc') return a.name.localeCompare(b.name);
    if (sortOrder === 'desc') return b.name.localeCompare(a.name);
    return 0;
  });

  if (!user) return <div className={styles.loading}>Loading dashboard...</div>;
  if (loading) return <div className={styles.loading}>Cargando...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title} data-cy="dashboard-title">Dashboard</h1>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Cerrar Sesión
        </button>
      </div>

      <div className={styles.stats}>
        <p>Total de proyectos: {projects.length}</p>
        <p>Mostrando: {filteredProjects.length}</p>
      </div>

      <div className={styles.form}>
        <input
          data-cy="project-name"
          placeholder="Nombre del proyecto"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
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

      <input
        type="text"
        placeholder="🔍 Buscar proyectos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.sortButtons}>
      <button onClick={() => setSortOrder('asc')} className={sortOrder === 'asc' ? styles.active : ''}>
        A-Z
      </button>
      <button onClick={() => setSortOrder('desc')} className={sortOrder === 'desc' ? styles.active : ''}>
        Z-A
      </button>
      <button onClick={() => setSortOrder('recent')} className={sortOrder === 'recent' ? styles.active : ''}>
        Recientes
      </button>
      </div>

      <div data-cy="project-list" className={styles.projectList}>
        {filteredProjects.map((p) => (
          
          <div key={p.id} data-cy="project-item" className={styles.projectItem}>
            {editingId === p.id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className={styles.editInput}
                />
                <button onClick={handleSaveEdit} className={styles.saveBtn}>
                  ✅
                </button>
                <button onClick={() => setEditingId(null)} className={styles.cancelBtn}>
                  ❌
                </button>
              </>
            ) : (
              <>
                <span>{p.name}</span>
                <div className={styles.actions}>
                  <button onClick={() => handleEdit(p)} className={styles.editBtn}>
                    ✏️
                  </button>
                  <button onClick={() => handleDelete(p.id)} className={styles.deleteBtn}>
                    🗑️
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

        {projects.length === 0 && (
          <div className={styles.emptyState}>
            <p>📋 No tienes proyectos todavía</p>
            <p>Crea tu primer proyecto arriba ⬆️</p>
          </div>
        )}

        {filteredProjects.length === 0 && searchTerm && projects.length > 0 && (
          <p className={styles.noResults}>🔍 No se encontraron proyectos con "{searchTerm}"</p>
        )}
      </div>

      {filteredProjects.length === 0 && searchTerm && (
        <p className={styles.noResults}>No se encontraron proyectos</p>
      )}
    </div>
  );
};

export default Dashboard;