using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ApiTarefas.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ApiTarefas.Controllers
{
        [ApiController]
        [Route("[controller]")]
        public class TarefasController : ControllerBase
        {
            private readonly ApplicationDbContext _db;

            public TarefasController(ApplicationDbContext db) => _db = db;

            [Authorize]
            [HttpPost("cadastrar")]
            public async Task<IActionResult> Cadastrar(Tarefa tarefa)
            {
                var email = User.Identity?.Name;
                var usuario = await _db.Usuarios.FirstOrDefaultAsync(u => u.Email == email);
                tarefa.UsuarioId = usuario.Id;
                _db.Tarefas.Add(tarefa);
                await _db.SaveChangesAsync();
                return Ok(tarefa);
            }

            [Authorize]
            [HttpGet("usuario")]
            public async Task<IActionResult> ListarPorUsuario()
            {
                var email = User.Identity?.Name;
                var usuario = await _db.Usuarios.FirstOrDefaultAsync(u => u.Email == email);
                var tarefas = await _db.Tarefas.Where(t => t.UsuarioId == usuario.Id).ToListAsync();
                return Ok(tarefas);
            }

            [Authorize]
            [HttpPatch("{id}/status")]
            public async Task<IActionResult> AtualizarStatus(int id)
            {
                var tarefa = await _db.Tarefas.FindAsync(id);
                if (tarefa == null) return NotFound();

                tarefa.Status = tarefa.Status switch
                {
                    "Nao Iniciada" => "Em Andamento",
                    "Em Andamento" => "Concluida",
                    _ => tarefa.Status
                };

                await _db.SaveChangesAsync();
                return Ok(tarefa);
            }
        }
    }