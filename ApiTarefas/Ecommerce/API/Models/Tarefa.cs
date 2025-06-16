public class Tarefa {
    public int Id { get; set; }
    public string? Titulo { get; set; }
    public string? Status { get; set; } = "Nao Iniciada";
    public int UsuarioId { get; set; }
    public Usuario Usuario { get; set; }
    public DateTime CriadoEm { get; set; } = DateTime.Now;
}