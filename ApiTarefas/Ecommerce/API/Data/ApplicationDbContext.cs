using Microsoft.EntityFrameworkCore;

namespace ApiTarefas.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) {}

        public DbSet<Usuario> Usuarios => Set<Usuario>();
        public DbSet<Tarefa> Tarefas => Set<Tarefa>();
    }
}
