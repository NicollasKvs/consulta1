public class Usuario {
    public int Id { get; set; }
    public string? Email { get; set; }
    public string? Senha { get; set; }
    public DateTime CriadoEm { get; set; } = DateTime.Now;
    public List<Tarefa>? Tarefas { get; set; }
}